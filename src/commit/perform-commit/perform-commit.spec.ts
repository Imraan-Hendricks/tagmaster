import { exec } from 'child_process';
import { performCommit } from './perform-commit';

jest.mock('child_process');
const mockExec = exec as unknown as jest.Mock;

describe('performCommit', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  test('should execute git commit command with the correct commit message', () => {
    const commitDetails = {
      type: 'feat',
      scope: 'module',
      shortDescription: 'add new feature',
      longDescription: 'This is a longer description',
      breakingChange: 'no',
      breakingChangeDescription: undefined,
      openIssue: 'no',
      openIssueReference: undefined,
    } as const;

    performCommit(commitDetails);

    expect(mockExec).toHaveBeenCalledTimes(1);
    expect(mockExec).toHaveBeenCalledWith(
      expect.stringContaining(
        `git commit -m "feat(module): add new feature\n\nThis is a longer description"`,
      ),
      expect.any(Function),
    );
  });

  test('should handle error and exit when git command execution fails', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation();

    mockExec.mockImplementationOnce((_, callback) => {
      const error = new Error('Git command failed');
      callback(error, null);
    });

    performCommit({
      type: 'feat',
      scope: '',
      shortDescription: '',
      longDescription: '',
      breakingChange: 'no',
      breakingChangeDescription: undefined,
      openIssue: 'no',
      openIssueReference: undefined,
    });

    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
