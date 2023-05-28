import { exec } from 'child_process';

type CommitType =
  | 'feat'
  | 'fix'
  | 'docs'
  | 'style'
  | 'refactor'
  | 'perf'
  | 'test'
  | 'build'
  | 'ci'
  | 'chore'
  | 'revert';

interface CommitDetails {
  type: CommitType;
  scope: string;
  shortDescription: string;
  longDescription: string;
  breakingChange: 'yes' | 'no';
  breakingChangeDescription: string | undefined;
  openIssue: 'yes' | 'no';
  openIssueReference: string | undefined;
}

export function performCommit({
  type,
  scope,
  shortDescription,
  longDescription,
  breakingChange,
  breakingChangeDescription,
  openIssue,
  openIssueReference,
}: CommitDetails) {
  const firstLine = `${type}${scope ? `(${scope})` : ''}: ${shortDescription}`;
  const longDescriptionLine = longDescription ? `\n\n${longDescription}` : '';
  const breakingChangeLine =
    breakingChange === 'yes'
      ? `\n\nBREAKING CHANGE: ${breakingChangeDescription}`
      : '';
  const openIssueLine = openIssue === 'yes' ? `\n\n${openIssueReference}` : '';
  const gitCommand = `git commit -m "${firstLine}${longDescriptionLine}${breakingChangeLine}${openIssueLine}"`;

  exec(gitCommand, (error, stdout) => {
    if (error) {
      console.error(`Error executing command`);
      console.error(`Feedback: ${error.message}`);
      console.error('Possible reasons for the error:');
      console.error('- Ensure that you are in a valid Git repository.');
      console.error(
        '- Make sure there are staged changes using the `git add` command.',
      );
      process.exit(1);
    }

    console.log('Git command output:');
    console.log(stdout);
  });
}
