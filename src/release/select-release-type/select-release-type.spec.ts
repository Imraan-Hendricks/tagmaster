import { promptSelect } from '../../prompts/prompt-select/prompt-select';
import { selectReleaseType } from './select-release-type';

jest.mock('../../prompts/prompt-select/prompt-select');

const mockPromptSelect = promptSelect as jest.Mock;

describe('selectReleaseType', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return the selected release type', async () => {
    const mockSelectedType = 'major';
    mockPromptSelect.mockResolvedValueOnce(mockSelectedType);

    const result = await selectReleaseType();

    expect(mockPromptSelect).toHaveBeenCalledWith('Select a release type:', [
      {
        ref: '1',
        action: 'major',
        description: 'Introduces backward-incompatible changes',
      },
      {
        ref: '2',
        action: 'minor',
        description:
          'Adds new features without breaking existing functionality',
      },
      {
        ref: '3',
        action: 'patch',
        description: 'Includes bug fixes and small improvements',
      },
      {
        ref: '4',
        action: 'premajor',
        description: 'Pre-release version with major changes',
      },
      {
        ref: '5',
        action: 'preminor',
        description: 'Pre-release version with minor changes',
      },
      {
        ref: '6',
        action: 'prepatch',
        description: 'Pre-release version with patch-level changes',
      },
      {
        ref: '7',
        action: 'prerelease',
        description: 'Pre-release version for testing purposes',
      },
    ]);

    expect(mockPromptSelect).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockSelectedType);
  });
});
