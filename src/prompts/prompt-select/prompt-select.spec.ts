import { promptSelect } from './prompt-select';
import { prompt } from '../prompt/prompt';

jest.mock('../prompt/prompt');

describe('promptSelect', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, 'log');
    consoleSpy.mockImplementation(() => {
      // do nothing
    });
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should return the selected action', async () => {
    const mockInstruction = 'Select an action:';
    const mockOptions = [
      { ref: '1', action: 'commit', description: 'Make a commit' },
      { ref: '2', action: 'release', description: 'Perform a release' },
      { ref: '3', action: 'license', description: 'Generate a license' },
    ];

    const mockPrompt = 'Enter your choice: ';
    const mockSelectedOption = '2';

    (prompt as jest.Mock).mockResolvedValueOnce(mockSelectedOption);

    const result = await promptSelect(mockInstruction, mockOptions);

    expect(consoleSpy).toHaveBeenCalledWith(mockInstruction);

    mockOptions.forEach(({ ref, action, description }) => {
      expect(consoleSpy).toHaveBeenCalledWith(
        `${ref}) ${action}: ${description}`,
      );
    });

    expect(prompt).toHaveBeenCalledWith(mockPrompt);
    expect(prompt).toHaveBeenCalledTimes(1);

    expect(result).toEqual('release');
  });

  it('should reprompt when an invalid option is selected', async () => {
    const mockInstruction = 'Select an action:';
    const mockOptions = [
      { ref: '1', action: 'commit', description: 'Make a commit' },
      { ref: '2', action: 'release', description: 'Perform a release' },
      { ref: '3', action: 'license', description: 'Generate a license' },
    ];

    const mockPrompt = 'Enter your choice: ';
    const mockInvalidOption = '5';
    const mockValidOption = '2';

    (prompt as jest.Mock)
      .mockResolvedValueOnce(mockInvalidOption)
      .mockResolvedValueOnce(mockValidOption);

    const result = await promptSelect(mockInstruction, mockOptions);

    expect(consoleSpy).toHaveBeenCalledWith(mockInstruction);

    mockOptions.forEach(({ ref, action, description }) => {
      expect(consoleSpy).toHaveBeenCalledWith(
        `${ref}) ${action}: ${description}`,
      );
    });

    expect(prompt).toHaveBeenCalledWith(mockPrompt);
    expect(prompt).toHaveBeenCalledTimes(2);

    expect(result).toEqual('release');
  });
});
