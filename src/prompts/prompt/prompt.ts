import readline from 'readline';

export function prompt(instruction: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    rl.question(instruction, (input: string) => {
      rl.close();
      resolve(input);
    });
  });
}
