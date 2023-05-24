import { promptSelect } from '../../prompts/prompt-select/prompt-select';
import { selectBreakingChange } from './select-breaking-change';

jest.mock('../../prompts/prompt-select/prompt-select');

const mockPromptSelect = promptSelect as jest.Mock;

const promptOptions = [
  {
    ref: 'y',
    action: 'yes',
    description: 'The change is not backwards-compatible',
  },
  {
    ref: 'n',
    action: 'no',
    description: 'The change is backwards-compatible',
  },
];

describe('selectBreakingChange', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return "yes" when a breaking change is selected', async () => {
    const mockSelectedAction = 'yes';
    mockPromptSelect.mockResolvedValueOnce(mockSelectedAction);

    const result = await selectBreakingChange();

    expect(mockPromptSelect).toHaveBeenCalledWith(
      'Is this a breaking change?',
      promptOptions,
    );

    expect(result).toEqual('yes');
  });

  it('should return "no" when a non-breaking change is selected', async () => {
    const mockSelectedAction = 'no';
    mockPromptSelect.mockResolvedValueOnce(mockSelectedAction);

    const result = await selectBreakingChange();

    expect(mockPromptSelect).toHaveBeenCalledWith(
      'Is this a breaking change?',
      promptOptions,
    );

    expect(result).toEqual('no');
  });
});
