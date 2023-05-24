import { prompt } from '../../prompts/prompt/prompt';
import { readShortDescription } from './read-short-description';

jest.mock('../../prompts/prompt/prompt');

const mockPrompt = prompt as jest.Mock;

describe('readShortDescription', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return the entered short description', async () => {
    const mockShortDescription = 'Fix issue with login validation';

    mockPrompt.mockResolvedValueOnce(mockShortDescription);

    const result = await readShortDescription();

    expect(mockPrompt).toHaveBeenCalledWith('Enter short description: ');
    expect(mockPrompt).toHaveBeenCalledTimes(1);

    expect(result).toEqual(mockShortDescription);
  });

  it('should re-prompt when no short description is entered', async () => {
    mockPrompt
      .mockResolvedValueOnce('')
      .mockResolvedValueOnce('Fix issue with login validation');

    const result = await readShortDescription();

    expect(mockPrompt).toHaveBeenCalledWith('Enter short description: ');
    expect(mockPrompt).toHaveBeenCalledTimes(2);

    expect(result).toEqual('Fix issue with login validation');
  });
});
