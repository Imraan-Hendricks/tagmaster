import { prompt } from '../../prompts/prompt/prompt';

export async function readShortDescription() {
  console.log(
    'Write a short, imperative tense description of the change (max 94 chars):',
  );
  let shortDescription = await prompt('Enter short description: ');

  while (!shortDescription) {
    console.log('\nShort description is required!');
    shortDescription = await prompt('Enter short description: ');
  }

  return shortDescription;
}
