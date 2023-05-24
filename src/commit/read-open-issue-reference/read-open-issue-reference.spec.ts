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
    const mockOpenIssueReference = 'fix #123';
    mockPrompt.mockResolvedValueOnce(mockOpenIssueReference);

    const result = await readOpenIssueReference();

    expect(mockPrompt).toHaveBeenCalledWith('Enter issue reference: ');
    expect(mockPrompt).toHaveBeenCalledTimes(1);

    expect(result).toEqual(mockOpenIssueReference);
  });

  it('should re-prompt when no issue reference is entered', async () => {
    mockPrompt.mockResolvedValueOnce('').mockResolvedValueOnce('fix #123');

    const result = await readOpenIssueReference();

    expect(mockPrompt).toHaveBeenCalledWith('Enter issue reference: ');
    expect(mockPrompt).toHaveBeenCalledTimes(2);

    expect(result).toEqual('fix #123');
  });
});
