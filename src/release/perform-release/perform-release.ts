import { exec } from 'child_process';
import { getLastTag } from '../get-last-tag/get-last-tag';

export type ReleaseType =
  | 'major'
  | 'minor'
  | 'patch'
  | 'premajor'
  | 'preminor'
  | 'prepatch'
  | 'prerelease';

export type Preid = 'alpha' | 'beta';

export async function performRelease(
  type: ReleaseType,
  preid?: Preid,
): Promise<{ lastTag: string; secondLastTag: string | null }> {
  try {
    const secondLastTag = await getLastTag();
    return new Promise(resolve => {
      const gitCommand = `npm version ${type}${
        preid ? ` --preid=${preid}` : ''
      }`;

      exec(gitCommand, (error, stdout) => {
        if (error) {
          console.error(`Error executing command`);
          console.error(`Feedback: ${error.message}`);
          console.error('Possible reasons for the error:');
          console.error('- Ensure that you are in a valid Git repository.');
          console.error('- Git working directory not clean.');
          process.exit(1);
        }

        resolve({ lastTag: stdout.split('\n')[0], secondLastTag });
      });
    });
  } catch (e) {
    console.error('Error retrieving last tag:', e);
    process.exit(1);
  }
}
