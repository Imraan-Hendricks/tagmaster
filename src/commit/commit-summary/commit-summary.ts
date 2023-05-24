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

interface CommitSummaryDetails {
  type: CommitType;
  scope: string;
  shortDescription: string;
  longDescription: string;
  breakingChange: 'yes' | 'no';
  breakingChangeDescription: string | undefined;
  openIssue: 'yes' | 'no';
  openIssueReference: string | undefined;
}

export function commitSummary({
  type,
  scope,
  shortDescription,
  longDescription,
  breakingChange,
  breakingChangeDescription,
  openIssue,
  openIssueReference,
}: CommitSummaryDetails) {
  console.log('Commit Summary:');
  console.log('---------------');
  console.log(`Type: ${type}`);
  if (scope) console.log(`Scope: ${scope}`);
  console.log(`Description: ${shortDescription}`);
  if (longDescription) console.log(`Long Description: ${longDescription}`);
  console.log(`Breaking Change: ${breakingChange}`);
  if (breakingChange === 'yes' && breakingChangeDescription)
    console.log(`Breaking Change Description: ${breakingChangeDescription}`);
  console.log(`Open Issue: ${openIssue}`);
  if (openIssue === 'yes' && openIssueReference)
    console.log(`Open issue reference: ${openIssueReference}`);
  console.log();
}
