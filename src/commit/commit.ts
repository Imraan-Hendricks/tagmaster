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
import { performCommit } from './perform-commit/perform-commit';

export async function commit() {
  const type = await selectCommitType();
  const scope = await readScope();
  const shortDescription = await readShortDescription();
  const longDescription = await readLongDescription();
  const breakingChange = await selectBreakingChange();
  const breakingChangeDescription = await readBreakingChangeDescription(
    breakingChange,
  );
  const openIssue = await selectOpenIssue();
  const openIssueReference = await readOpenIssueReference(openIssue);

  const commitData = {
    type,
    scope,
    shortDescription,
    longDescription,
    breakingChange,
    breakingChangeDescription,
    openIssue,
    openIssueReference,
  };
  // add commit linting here
  commitSummary(commitData);
  await selectCommitConfirmation();

  performCommit(commitData);
}
