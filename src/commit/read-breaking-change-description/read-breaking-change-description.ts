import { prompt } from '../../prompts/prompt/prompt';

export async function readBreakingChangeDescription(
  breakingChange: 'yes' | 'no',
) {
  let breakingChangeDescription: string | undefined;

  if (breakingChange === 'yes') {
    console.log('Describe the breaking changes:');
    breakingChangeDescription = await prompt('Enter description: ');

    while (!breakingChangeDescription) {
      console.log('\nBreaking change description is required!');
      breakingChangeDescription = await prompt('Enter description: ');
    }
    console.log();
  }

  return breakingChangeDescription;
}
