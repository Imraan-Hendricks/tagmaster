import { prompt } from '../../prompts/prompt/prompt';
import { readScope } from './read-scope';

jest.mock('../../prompts/prompt/prompt');

const mockPrompt = prompt as jest.Mock;

describe('readScope', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return the entered scope', async () => {
    const mockScope = 'component';
    mockPrompt.mockResolvedValueOnce(mockScope);

    const result = await readScope();

    expect(mockPrompt).toHaveBeenCalledWith('Enter your scope: ');
    expect(mockPrompt).toHaveBeenCalledTimes(1);

    expect(result).toEqual(mockScope);
  });
});
