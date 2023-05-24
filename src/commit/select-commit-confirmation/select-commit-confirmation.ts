import { promptSelect } from '../../prompts/prompt-select/prompt-select';

export async function selectCommitConfirmation() {
  const commitConfirmation = await promptSelect(
    'Do you agree with the above commit details?',
    [
      {
        ref: 'y',
        action: 'yes',
        description: 'Yes, I agree with the commit details',
      },
      {
        ref: 'n',
        action: 'no',
        description: 'No, I want to make changes',
      },
    ],
  );
  return commitConfirmation;
}
