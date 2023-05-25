import { prompt } from '../../prompts/prompt/prompt';
import { readOpenIssueReference } from './read-open-issue-reference';

jest.mock('../../prompts/prompt/prompt');

const mockPrompt = prompt as jest.Mock;

describe('readOpenIssueReference', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return the entered issue reference', async () => {
    const openIssue = 'yes';
    const mockOpenIssueReference = 'fix #123';
    mockPrompt.mockResolvedValueOnce(mockOpenIssueReference);

    const result = await readOpenIssueReference(openIssue);

    expect(mockPrompt).toHaveBeenCalledWith('Enter issue reference: ');
    expect(mockPrompt).toHaveBeenCalledTimes(1);

    expect(result).toEqual(mockOpenIssueReference);
  });

  it('should re-prompt when no issue reference is entered', async () => {
    const openIssue = 'yes';
    mockPrompt.mockResolvedValueOnce('').mockResolvedValueOnce('fix #123');

    const result = await readOpenIssueReference(openIssue);

    expect(mockPrompt).toHaveBeenCalledWith('Enter issue reference: ');
    expect(mockPrompt).toHaveBeenCalledTimes(2);

    expect(result).toEqual('fix #123');
  });

  it('should return nothing when no open issue', async () => {
    const openIssue = 'no';
    const mockOpenIssueReference = 'fix #123';
    mockPrompt.mockResolvedValueOnce(mockOpenIssueReference);

    const result = await readOpenIssueReference(openIssue);

    expect(mockPrompt).not.toHaveBeenCalled();
    expect(result).toEqual(undefined);
  });
});
