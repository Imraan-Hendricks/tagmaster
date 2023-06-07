import { commit } from './commit';
import { selectCommitType } from './select-commit-type/select-commit-type';
import { readScope } from './read-scope/read-scope';
import { readShortDescription } from './read-short-description/read-short-description';
import { readLongDescription } from './read-long-description/read-long-description';
import { selectBreakingChange } from './select-breaking-change/select-breaking-change';
import { readBreakingChangeDescription } from './read-breaking-change-description/read-breaking-change-description';
import { selectOpenIssue } from './select-open-issue/select-open-issue';
import { readOpenIssueReference } from './read-open-issue-reference/read-open-issue-reference';
import { commitSummary } from './commit-summary/commit-summary';
import { selectCommitConfirmation } from './select-commit-confirmation/select-commit-confirmation';
import { performCommit } from './perform-commit/perform-commit';

jest.mock('./select-commit-type/select-commit-type');
jest.mock('./read-scope/read-scope');
jest.mock('./read-short-description/read-short-description');
jest.mock('./read-long-description/read-long-description');
jest.mock('./select-breaking-change/select-breaking-change');
jest.mock(
  './read-breaking-change-description/read-breaking-change-description',
);
jest.mock('./select-open-issue/select-open-issue');
jest.mock('./read-open-issue-reference/read-open-issue-reference');
jest.mock('./commit-summary/commit-summary');
jest.mock('./select-commit-confirmation/select-commit-confirmation');
jest.mock('./perform-commit/perform-commit');

const mockSelectCommitType = selectCommitType as jest.Mock;
const mockReadScope = readScope as jest.Mock;
const mockReadShortDescription = readShortDescription as jest.Mock;
const mockReadLongDescription = readLongDescription as jest.Mock;
const mockSelectBreakingChange = selectBreakingChange as jest.Mock;
const mockReadBreakingChangeDescription =
  readBreakingChangeDescription as jest.Mock;
const mockSelectOpenIssue = selectOpenIssue as jest.Mock;
const mockReadOpenIssueReference = readOpenIssueReference as jest.Mock;
const mockCommitSummary = commitSummary as jest.Mock;
const mockSelectCommitConfirmation = selectCommitConfirmation as jest.Mock;
const mockPerformCommit = performCommit as jest.Mock;

describe('commit', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should perform the commit process', async () => {
    const mockType = 'feat';
    const mockScope = 'component';
    const mockShortDescription = 'Implement new feature';
    const mockLongDescription =
      'This feature enhances the component functionality';
    const mockBreakingChange = 'no';
    const mockBreakingChangeDescription = undefined;
    const mockOpenIssue = 'yes';
    const mockOpenIssueReference = '#123';
    const mockCommitConfirmation = 'yes';

    mockSelectCommitType.mockResolvedValue(mockType);
    mockReadScope.mockResolvedValue(mockScope);
    mockReadShortDescription.mockResolvedValue(mockShortDescription);
    mockReadLongDescription.mockResolvedValue(mockLongDescription);
    mockSelectBreakingChange.mockResolvedValue(mockBreakingChange);
    mockReadBreakingChangeDescription.mockResolvedValue(
      mockBreakingChangeDescription,
    );
    mockSelectOpenIssue.mockResolvedValue(mockOpenIssue);
    mockReadOpenIssueReference.mockResolvedValue(mockOpenIssueReference);
    mockSelectCommitConfirmation.mockResolvedValue(mockCommitConfirmation);

    await commit();

    expect(mockSelectCommitType).toHaveBeenCalledTimes(1);
    expect(mockReadScope).toHaveBeenCalledTimes(1);
    expect(mockReadShortDescription).toHaveBeenCalledTimes(1);
    expect(mockReadLongDescription).toHaveBeenCalledTimes(1);
    expect(mockSelectBreakingChange).toHaveBeenCalledTimes(1);
    expect(mockReadBreakingChangeDescription).toHaveBeenCalledTimes(1);
    expect(mockSelectOpenIssue).toHaveBeenCalledTimes(1);
    expect(mockReadOpenIssueReference).toHaveBeenCalledTimes(1);
    expect(mockCommitSummary).toHaveBeenCalledWith({
      type: mockType,
      scope: mockScope,
      shortDescription: mockShortDescription,
      longDescription: mockLongDescription,
      breakingChange: mockBreakingChange,
      breakingChangeDescription: mockBreakingChangeDescription,
      openIssue: mockOpenIssue,
      openIssueReference: mockOpenIssueReference,
    });
    expect(mockSelectCommitConfirmation).toHaveBeenCalledTimes(1);
    expect(mockPerformCommit).toHaveBeenCalledTimes(1);
  });
});
