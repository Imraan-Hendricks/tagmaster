import { commitSummary } from './commit-summary/commit-summary';
import { readShortDescription } from './read-short-description/read-short-description';
import { selectBreakingChange } from './select-breaking-change/select-breaking-change';
import { selectCommitType } from './select-commit-type/select-commit-type';
import { selectOpenIssue } from './select-open-issue/select-open-issue';
import { selectCommitConfirmation } from './select-commit-confirmation/select-commit-confirmation';
import { readOpenIssueReference } from './read-open-issue-reference/read-open-issue-reference';
import { readBreakingChangeDescription } from './read-breaking-change-description/read-breaking-change-description';
import { readLongDescription } from './read-long-description/read-long-description';
import { readScope } from './read-scope/read-scope';

export async function commit() {
  const type = await selectCommitType();
  console.log(type + '\n');

  const scope = await readScope();
  console.log(scope ? '' : 'Skipped!\n');

  const shortDescription = await readShortDescription();
  console.log();

  const longDescription = await readLongDescription();
  console.log(longDescription ? '' : 'Skipped!\n');

  const breakingChange = await selectBreakingChange();
  console.log(breakingChange + '\n');

  let breakingChangeDescription: string | undefined;
  if (breakingChange === 'yes') {
    breakingChangeDescription = await readBreakingChangeDescription();
    console.log();
  }

  const openIssue = await selectOpenIssue();
  console.log(openIssue + '\n');

  let openIssueReference: string | undefined;
  if (openIssue === 'yes') {
    openIssueReference = await readOpenIssueReference();
    console.log();
  }

  commitSummary({
    type,
    scope,
    shortDescription,
    longDescription,
    breakingChange,
    breakingChangeDescription,
    openIssue,
    openIssueReference,
  });

  const commitConfirmation = await selectCommitConfirmation();
  console.log(commitConfirmation + '\n');
}
