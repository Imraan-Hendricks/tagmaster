import { prompt } from '../../prompts/prompt/prompt';

export async function readOpenIssueReference() {
  console.log('Add issue references (e.g. "fix #123", "re #123":');
  let openIssueReference = await prompt('Enter issue reference: ');

  while (!openIssueReference) {
    console.log('\nIssue reference is required!');
    openIssueReference = await prompt('Enter issue reference: ');
  }

  return openIssueReference;
}
