import main from './';
import { promptSelect } from './prompts/prompt-select/prompt-select';
import * as commitModule from './commit/commit';
import * as releaseModule from './release/release';
import * as licenseModule from './license/license';

jest.mock('./prompts/prompt-select/prompt-select');

jest.mock('./commit/commit', () => ({
  commit: jest.fn(),
}));

jest.mock('./release/release', () => ({
  release: jest.fn(),
}));

jest.mock('./license/license', () => ({
  license: jest.fn(),
}));

describe('main', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call commit function when action is "commit"', async () => {
    const mockAction = 'commit';
    (promptSelect as jest.Mock).mockResolvedValue(mockAction);

    const commitSpy = jest.spyOn(commitModule, 'commit');
    const releaseSpy = jest.spyOn(releaseModule, 'release');
    const licenseSpy = jest.spyOn(licenseModule, 'license');

    await main();

    expect(commitSpy).toHaveBeenCalled();
    expect(releaseSpy).not.toHaveBeenCalled();
    expect(licenseSpy).not.toHaveBeenCalled();
  });

  it('should call release function when action is "release"', async () => {
    const mockAction = 'release';
    (promptSelect as jest.Mock).mockResolvedValue(mockAction);

    const commitSpy = jest.spyOn(commitModule, 'commit');
    const releaseSpy = jest.spyOn(releaseModule, 'release');
    const licenseSpy = jest.spyOn(licenseModule, 'license');

    await main();

    expect(commitSpy).not.toHaveBeenCalled();
    expect(releaseSpy).toHaveBeenCalled();
    expect(licenseSpy).not.toHaveBeenCalled();
  });

  it('should call license function when action is "license"', async () => {
    const mockAction = 'license';
    (promptSelect as jest.Mock).mockResolvedValue(mockAction);

    const commitSpy = jest.spyOn(commitModule, 'commit');
    const releaseSpy = jest.spyOn(releaseModule, 'release');
    const licenseSpy = jest.spyOn(licenseModule, 'license');

    await main();

    expect(commitSpy).not.toHaveBeenCalled();
    expect(releaseSpy).not.toHaveBeenCalled();
    expect(licenseSpy).toHaveBeenCalled();
  });

  it('should display error message and exit when action is unknown', async () => {
    const mockAction = 'unknown';
    (promptSelect as jest.Mock).mockResolvedValue(mockAction);

    const consoleErrorSpy = jest.spyOn(console, 'error');
    const processExitSpy = jest
      .spyOn(process, 'exit')
      .mockImplementation(jest.fn<never, [number?]>());
    await main();

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(processExitSpy).toHaveBeenCalledWith(1);
  });
});
