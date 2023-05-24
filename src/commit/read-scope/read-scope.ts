import { prompt } from '../../prompts/prompt/prompt';

export async function readScope() {
  console.log(
    'What is the scope of this change (e.g. component or file name): (press enter to skip)',
  );
  const scope = await prompt('Enter your scope: ');
  return scope;
}
