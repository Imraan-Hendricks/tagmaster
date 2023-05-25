import { prompt } from '../../prompts/prompt/prompt';
import { readBreakingChangeDescription } from './read-breaking-change-description';

jest.mock('../../prompts/prompt/prompt');

const mockPrompt = prompt as jest.Mock;

describe('readBreakingChangeDescription', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return the entered breaking change description', async () => {
    const breakingChange = 'yes';
    const mockBreakingChangeDescription = 'Updated API response format';
    mockPrompt.mockResolvedValueOnce(mockBreakingChangeDescription);

    const result = await readBreakingChangeDescription(breakingChange);

    expect(mockPrompt).toHaveBeenCalledWith('Enter description: ');
    expect(mockPrompt).toHaveBeenCalledTimes(1);

    expect(result).toEqual(mockBreakingChangeDescription);
  });

  it('should re-prompt when no breaking change description is entered', async () => {
    const breakingChange = 'yes';
    mockPrompt
      .mockResolvedValueOnce('')
      .mockResolvedValueOnce('Updated API response format');

    const result = await readBreakingChangeDescription(breakingChange);

    expect(mockPrompt).toHaveBeenCalledWith('Enter description: ');
    expect(mockPrompt).toHaveBeenCalledTimes(2);

    expect(result).toEqual('Updated API response format');
  });

  it('should return nothing when no breaking change', async () => {
    const breakingChange = 'no';
    const mockBreakingChangeDescription = 'Updated API response format';
    mockPrompt.mockResolvedValueOnce(mockBreakingChangeDescription);

    const result = await readBreakingChangeDescription(breakingChange);

    expect(mockPrompt).not.toHaveBeenCalled();
    expect(result).toEqual(undefined);
  });
});
