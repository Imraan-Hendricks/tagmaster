import { exec } from 'child_process';
import { tagsExists } from './tags-exists';

jest.mock('child_process');

const mockExec = exec as unknown as jest.Mock;

describe('tagsExists', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should resolve to true if tags exist', async () => {
    const mockStdout = 'v1.0.0\nv1.1.0\nv1.2.0\n';
    mockExec.mockImplementation((command, callback) => {
      callback(null, mockStdout, null);
    });

    const result = await tagsExists();

    expect(mockExec).toHaveBeenCalledWith('git tag', expect.any(Function));
    expect(result).toBe(true);
  });

  it('should resolve to false if no tags exist', async () => {
    const mockStdout = '';
    mockExec.mockImplementation((command, callback) => {
      callback(null, mockStdout, null);
    });

    const result = await tagsExists();

    expect(mockExec).toHaveBeenCalledWith('git tag', expect.any(Function));
    expect(result).toBe(false);
  });

  it('should reject with an error message if command execution fails', async () => {
    const mockErrorMessage = 'Command execution failed';
    mockExec.mockImplementation((command, callback) => {
      callback(new Error(mockErrorMessage), null, null);
    });

    await expect(tagsExists()).rejects.toEqual(
      `Error executing command: ${mockErrorMessage}`,
    );
    expect(mockExec).toHaveBeenCalledWith('git tag', expect.any(Function));
  });
});
