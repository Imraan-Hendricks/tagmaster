import { prompt } from '../../prompts/prompt/prompt';

export async function readOpenIssueReference(openIssue: 'yes' | 'no') {
  let openIssueReference: string | undefined;

  if (openIssue === 'yes') {
    console.log('Add issue references (e.g. "fix #123", "re #123":');
    openIssueReference = await prompt('Enter issue reference: ');

    while (!openIssueReference) {
      console.log('\nIssue reference is required!');
      openIssueReference = await prompt('Enter issue reference: ');
    }
    console.log();
  }

  return openIssueReference;
}
