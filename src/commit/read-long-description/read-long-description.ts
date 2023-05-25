import { prompt } from '../../prompts/prompt/prompt';

export async function readLongDescription() {
  console.log(
    'Provide a longer description of the change: (press enter to skip)',
  );
  const longDescription = await prompt('Enter long description: ');

  console.log(longDescription ? '' : 'Skipped!\n');
  return longDescription;
}
