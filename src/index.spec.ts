import main from './';
import { commit } from './commit/commit';
import { release } from './release/release';
import { license } from './license/license';
import { promptSelect } from './prompts/prompt-select/prompt-select';

jest.mock('./commit/commit');
jest.mock('./release/release');
jest.mock('./license/license');
jest.mock('./prompts/prompt-select/prompt-select');

const mockCommit = commit as jest.Mock;
const mockRelease = release as jest.Mock;
const mockLicense = license as jest.Mock;
const mockPromptSelect = promptSelect as jest.Mock;

describe('main', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('menu', () => {
    it('should call commit function when action is "commit"', async () => {
      const mockAction = 'commit';
      mockPromptSelect.mockResolvedValue(mockAction);

      await main();

      expect(mockCommit).toHaveBeenCalled();
      expect(mockRelease).not.toHaveBeenCalled();
      expect(mockLicense).not.toHaveBeenCalled();
    });

    it('should call release function when action is "release"', async () => {
      const mockAction = 'release';
      mockPromptSelect.mockResolvedValue(mockAction);

      await main();

      expect(mockCommit).not.toHaveBeenCalled();
      expect(mockRelease).toHaveBeenCalled();
      expect(mockLicense).not.toHaveBeenCalled();
    });

    it('should call license function when action is "license"', async () => {
      const mockAction = 'license';
      mockPromptSelect.mockResolvedValue(mockAction);

      await main();

      expect(mockCommit).not.toHaveBeenCalled();
      expect(mockRelease).not.toHaveBeenCalled();
      expect(mockLicense).toHaveBeenCalled();
    });
  });

  it('should display error message and exit when action is unknown', async () => {
    const mockAction = 'unknown';
    mockPromptSelect.mockResolvedValue(mockAction);

    const consoleErrorSpy = jest.spyOn(console, 'error');
    const processExitSpy = jest
      .spyOn(process, 'exit')
      .mockImplementation(jest.fn<never, [number?]>());

    await main();

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });
});
