import { promptSelect } from '../../prompts/prompt-select/prompt-select';

export async function selectOpenIssue() {
  const openIssue = await promptSelect(
    'Does this change affect any open issues?',
    [
      {
        ref: 'y',
        action: 'yes',
        description: 'It does affect an open issue',
      },
      {
        ref: 'n',
        action: 'no',
        description: 'It does not affect an open issue',
      },
    ],
  );

  console.log(openIssue + '\n');
  return openIssue;
}
