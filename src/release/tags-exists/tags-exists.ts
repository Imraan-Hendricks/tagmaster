import { exec } from 'child_process';

export function tagsExists() {
  return new Promise((resolve, reject) => {
    exec('git tag', (error, stdout, stderr) => {
      if (error) return reject(`Error executing command: ${error.message}`);
      if (stderr) return reject(`Command execution failed: ${stderr}`);

      const tags = stdout.split('\n').filter(tag => tag.trim() !== '');
      if (tags.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}
