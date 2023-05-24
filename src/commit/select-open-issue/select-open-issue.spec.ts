import { promptSelect } from '../../prompts/prompt-select/prompt-select';
import { selectOpenIssue } from './select-open-issue';

jest.mock('../../prompts/prompt-select/prompt-select');

const mockPromptSelect = promptSelect as jest.Mock;

describe('selectOpenIssue', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return "yes" when an open issue is affected', async () => {
    const mockSelectedAction = 'yes';
    mockPromptSelect.mockResolvedValueOnce(mockSelectedAction);

    const result = await selectOpenIssue();

    expect(mockPromptSelect).toHaveBeenCalledWith(
      'Does this change affect any open issues?',
      [
        {
          ref: 'y',
          action: 'yes',
          description: 'It does affect an open issue',
        },
        {
          ref: 'n',
          action: 'no',
          description: 'It does not affect an open issue',
        },
      ],
    );

    expect(result).toEqual('yes');
  });

  it('should return "no" when no open issue is affected', async () => {
    const mockSelectedAction = 'no';
    mockPromptSelect.mockResolvedValueOnce(mockSelectedAction);

    const result = await selectOpenIssue();

    expect(mockPromptSelect).toHaveBeenCalledWith(
      'Does this change affect any open issues?',
      [
        {
          ref: 'y',
          action: 'yes',
          description: 'It does affect an open issue',
        },
        {
          ref: 'n',
          action: 'no',
          description: 'It does not affect an open issue',
        },
      ],
    );

    expect(result).toEqual('no');
  });
});
