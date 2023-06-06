import { exec } from 'child_process';
import { tagsExists } from '../tags-exists/tags-exists';

const changelogFile = 'changelog.md';

async function execCommand(command: string): Promise<string> {
  const cRLFWarningRegex = /warning: LF will be replaced by CRLF/;
  return new Promise((resolve, reject) => {
    exec(command, (error, stdOut, stdError) => {
      if (error && !cRLFWarningRegex.test(stdError)) {
        console.error(`Error executing command: ${error.message}`);
        return reject(new Error(error.message));
      }

      if (stdError && !cRLFWarningRegex.test(stdError)) {
        console.error(`Command execution failed: ${stdError}`);
        return reject(new Error(stdError));
      }
      resolve(stdOut);
    });
  });
}

export async function addChangelong(lastTag: string) {
  try {
    const exists = await tagsExists();
    if (exists) await execCommand(`git tag -d ${lastTag}`);
    await execCommand(`git add ${changelogFile}`);
    await execCommand(`git commit --amend -m "chore(release): ${lastTag}"`);
    await execCommand(`git tag ${lastTag}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
