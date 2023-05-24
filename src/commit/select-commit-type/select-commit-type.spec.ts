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

    expect(mockPromptSelect).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockSelectedAction);
  });
});
