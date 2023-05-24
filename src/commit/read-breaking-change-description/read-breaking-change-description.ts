import { prompt } from '../../prompts/prompt/prompt';

export async function readBreakingChangeDescription() {
  console.log('Describe the breaking changes:');
  let breakingChangeDescription = await prompt('Enter description: ');

  while (!breakingChangeDescription) {
    console.log('\nBreaking change description is required!');
    breakingChangeDescription = await prompt('Enter description: ');
  }

  return breakingChangeDescription;
}
