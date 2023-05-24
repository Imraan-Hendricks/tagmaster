import { prompt } from '../../prompts/prompt/prompt';
import { readLongDescription } from './read-long-description';

jest.mock('../../prompts/prompt/prompt');

const mockPrompt = prompt as jest.Mock;

describe('readLongDescription', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return the entered long description', async () => {
    const mockLongDescription =
      'This change addresses performance issues and optimizes the search algorithm.';

    mockPrompt.mockResolvedValueOnce(mockLongDescription);

    const result = await readLongDescription();

    expect(mockPrompt).toHaveBeenCalledWith('Enter long description: ');
    expect(mockPrompt).toHaveBeenCalledTimes(1);

    expect(result).toEqual(mockLongDescription);
  });
});
