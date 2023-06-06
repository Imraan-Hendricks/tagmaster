import { promptSelect } from '../../prompts/prompt-select/prompt-select';
import { selectPreid } from './select-preid';

jest.mock('../../prompts/prompt-select/prompt-select');

const mockPromptSelect = promptSelect as jest.Mock;

describe('selectPreid', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return the selected preid when type includes "pre"', async () => {
    const mockSelectedPreid = 'alpha';
    mockPromptSelect.mockResolvedValueOnce(mockSelectedPreid);

    const result = await selectPreid('premajor');

    expect(mockPromptSelect).toHaveBeenCalledWith('Select a release type:', [
      {
        ref: '1',
        action: 'standard',
        description: 'Standard pre-release identifier',
      },
      {
        ref: '2',
        action: 'alpha',
        description: 'Alpha version for testing purposes',
      },
      {
        ref: '3',
        action: 'beta',
        description: 'Beta version for testing purposes',
      },
    ]);

    expect(mockPromptSelect).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockSelectedPreid);
  });

  it('should return undefined when type does not include "pre"', async () => {
    const result = await selectPreid('patch');

    expect(mockPromptSelect).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });
});
