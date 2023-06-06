import { exec } from 'child_process';
import { tagsExists } from '../tags-exists/tags-exists';

export async function getLastTag(): Promise<string | null> {
  try {
    const exists = await tagsExists();
    if (!exists) return null;
    return new Promise((resolve, reject) => {
      exec('git describe --tags --abbrev=0', (error, stdout) => {
        if (error)
          return reject(
            new Error(`Failed to execute command: ${error.message}`),
          );
        resolve(stdout.trim());
      });
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}
