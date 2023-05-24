import { prompt } from '../prompt/prompt';
import { promptSelect } from './prompt-select';

jest.mock('../prompt/prompt');

const mockPrompt = prompt as jest.Mock;

describe('promptSelect', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.resetAllMocks();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return the selected action', async () => {
    const mockTitle = 'Select an action:';
    const mockOptions = [
      { ref: '1', action: 'commit', description: 'Make a commit' },
      { ref: '2', action: 'release', description: 'Perform a release' },
      { ref: '3', action: 'license', description: 'Generate a license' },
    ];

    const mockInstruction = 'Enter your choice: ';
    const mockSelectedOption = '2';

    mockPrompt.mockResolvedValueOnce(mockSelectedOption);

    const result = await promptSelect(mockTitle, mockOptions);

    expect(consoleSpy).toHaveBeenCalledWith(mockTitle);

    mockOptions.forEach(({ ref, action, description }) => {
      expect(consoleSpy).toHaveBeenCalledWith(
        `${ref}) ${action}: ${description}`,
      );
    });

    expect(mockPrompt).toHaveBeenCalledWith(mockInstruction);
    expect(mockPrompt).toHaveBeenCalledTimes(1);

    expect(result).toEqual('release');
  });

  it('should reprompt when an invalid option is selected', async () => {
    const mockTitle = 'Select an action:';
    const mockOptions = [
      { ref: '1', action: 'commit', description: 'Make a commit' },
      { ref: '2', action: 'release', description: 'Perform a release' },
      { ref: '3', action: 'license', description: 'Generate a license' },
    ];

    const mockInstruction = 'Enter your choice: ';
    const mockInvalidOption = '5';
    const mockValidOption = '2';

    mockPrompt
      .mockResolvedValueOnce(mockInvalidOption)
      .mockResolvedValueOnce(mockValidOption);

    const result = await promptSelect(mockTitle, mockOptions);

    expect(consoleSpy).toHaveBeenCalledWith(mockTitle);

    mockOptions.forEach(({ ref, action, description }) => {
      expect(consoleSpy).toHaveBeenCalledWith(
        `${ref}) ${action}: ${description}`,
      );
    });

    expect(mockPrompt).toHaveBeenCalledWith(mockInstruction);
    expect(mockPrompt).toHaveBeenCalledTimes(2);

    expect(result).toEqual('release');
  });
});
