import { promptSelect } from '../../prompts/prompt-select/prompt-select';

export async function selectBreakingChange() {
  const breakingChange = await promptSelect('Is this a breaking change?', [
    {
      ref: 'y',
      action: 'yes',
      description: 'The change is not backwards-compatible',
    },
    {
      ref: 'n',
      action: 'no',
      description: 'The change is backwards-compatible',
    },
  ]);
  return breakingChange;
}
