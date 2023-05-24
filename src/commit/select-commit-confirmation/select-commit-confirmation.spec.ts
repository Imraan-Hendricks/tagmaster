import { promptSelect } from '../../prompts/prompt-select/prompt-select';
import { selectCommitConfirmation } from './select-commit-confirmation';

jest.mock('../../prompts/prompt-select/prompt-select');

const mockPromptSelect = promptSelect as jest.Mock;

describe('selectCommitConfirmation', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return "yes" when "yes" is selected', async () => {
    const mockSelectedAction = 'yes';
    mockPromptSelect.mockResolvedValueOnce(mockSelectedAction);

    const result = await selectCommitConfirmation();

    expect(mockPromptSelect).toHaveBeenCalledWith(
      'Do you agree with the above commit details?',
      [
        {
          ref: 'y',
          action: 'yes',
          description: 'Yes, I agree with the commit details',
        },
        {
          ref: 'n',
          action: 'no',
          description: 'No, I want to make changes',
        },
      ],
    );

    expect(result).toEqual('yes');
  });

  it('should return "no" when "no" is selected', async () => {
    const mockSelectedAction = 'no';
    mockPromptSelect.mockResolvedValueOnce(mockSelectedAction);

    const result = await selectCommitConfirmation();

    expect(mockPromptSelect).toHaveBeenCalledWith(
      'Do you agree with the above commit details?',
      [
        {
          ref: 'y',
          action: 'yes',
          description: 'Yes, I agree with the commit details',
        },
        {
          ref: 'n',
          action: 'no',
          description: 'No, I want to make changes',
        },
      ],
    );

    expect(result).toEqual('no');
  });
});
