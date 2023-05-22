import readline from 'readline';
import { prompt } from './prompt';

jest.mock('readline');

describe('prompt', () => {
  it('should resolve with user input', async () => {
    const mockInput = 'Test Input';
    const mockPrompt = 'Enter a value: ';

    const mockInterface = {
      question: jest.fn((_, callback) => callback(mockInput)),
      close: jest.fn(),
    } as unknown as readline.Interface;

    (readline.createInterface as jest.Mock).mockReturnValueOnce(mockInterface);

    const result = await prompt(mockPrompt);

    expect(readline.createInterface).toHaveBeenCalledWith(
      expect.objectContaining({
        input: process.stdin,
        output: process.stdout,
      }),
    );

    expect(result).toEqual(mockInput);
    expect(mockInterface.question).toHaveBeenCalledWith(
      mockPrompt,
      expect.any(Function),
    );

    expect(mockInterface.close).toHaveBeenCalled();
  });
});
