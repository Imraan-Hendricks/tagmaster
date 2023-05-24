import { promptSelect } from '../../prompts/prompt-select/prompt-select';
import { selectCommitType } from './select-commit-type';

jest.mock('../../prompts/prompt-select/prompt-select');

const mockPromptSelect = promptSelect as jest.Mock;

describe('selectCommitType', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return the selected commit type', async () => {
    const mockSelectedAction = 'docs';
    mockPromptSelect.mockResolvedValueOnce(mockSelectedAction);

    const result = await selectCommitType();

    expect(mockPromptSelect).toHaveBeenCalledWith('Select a commit type:', [
      { ref: '1', action: 'feat', description: 'A new feature' },
      { ref: '2', action: 'fix', description: 'A bug fix' },
      { ref: '3', action: 'docs', description: 'Documentation changes' },
      { ref: '4', action: 'style', description: 'Code style changes' },
      { ref: '5', action: 'refactor', description: 'Code refactoring' },
      { ref: '6', action: 'perf', description: 'Performance improvements' },
      { ref: '7', action: 'test', description: 'Test related changes' },
      { ref: '8', action: 'build', description: 'Build system changes' },
      { ref: '9', action: 'ci', description: 'CI/CD related changes' },
      {
        ref: '10',
        action: 'chore',
        description: `Other changes that don't modify src or test files`,
      },
      { ref: '11', action: 'revert', description: 'Revert a previous commit' },
    ]);

    expect(mockPromptSelect).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockSelectedAction);
  });
});
