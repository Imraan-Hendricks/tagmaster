import { exec } from 'child_process';
import { tagsExists } from '../tags-exists/tags-exists';
import { getLastTag } from './get-last-tag';

jest.mock('child_process');
jest.mock('../tags-exists/tags-exists');

const mockExec = exec as unknown as jest.Mock;
const mockTagsExists = tagsExists as jest.Mock;

describe('getLastTag', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return the last tag if tags exist', async () => {
    const mockLastTag = 'v1.2.0';
    mockTagsExists.mockResolvedValue(true);
    mockExec.mockImplementation((command, callback) => {
      callback(null, mockLastTag);
    });

    const result = await getLastTag();

    expect(mockTagsExists).toHaveBeenCalled();
    expect(mockExec).toHaveBeenCalledWith(
      'git describe --tags --abbrev=0',
      expect.any(Function),
    );
    expect(result).toBe(mockLastTag.trim());
  });

  it('should return null if no tags exist', async () => {
    mockTagsExists.mockResolvedValue(false);

    const result = await getLastTag();

    expect(mockTagsExists).toHaveBeenCalled();
    expect(mockExec).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('should reject with an error message if command execution fails', async () => {
    const mockErrorMessage = 'Failed to execute command';
    mockTagsExists.mockResolvedValue(true);
    mockExec.mockImplementation((command, callback) => {
      callback(new Error(mockErrorMessage), null);
    });

    await expect(getLastTag()).rejects.toEqual(
      new Error(`Failed to execute command: ${mockErrorMessage}`),
    );
    expect(mockTagsExists).toHaveBeenCalled();
    expect(mockExec).toHaveBeenCalledWith(
      'git describe --tags --abbrev=0',
      expect.any(Function),
    );
  });
});
