import { commitSummary } from './commit-summary';

describe('commitSummary', () => {
  let mockConsoleLog: jest.SpyInstance;

  beforeEach(() => {
    jest.resetAllMocks();
    mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should log the commit summary details', () => {
    const commitDetails = {
      type: 'feat',
      scope: 'component',
      shortDescription: 'Add new feature',
      longDescription: 'This is a longer description',
      breakingChange: 'yes',
      breakingChangeDescription: 'Description of breaking change',
      openIssue: 'yes',
      openIssueReference: '#123',
    } as const;

    commitSummary(commitDetails);

    expect(mockConsoleLog).toHaveBeenCalledWith('Commit Summary:');
    expect(mockConsoleLog).toHaveBeenCalledWith('---------------');
    expect(mockConsoleLog).toHaveBeenCalledWith('Type: feat');
    expect(mockConsoleLog).toHaveBeenCalledWith('Scope: component');
    expect(mockConsoleLog).toHaveBeenCalledWith('Description: Add new feature');
    expect(mockConsoleLog).toHaveBeenCalledWith(
      'Long Description: This is a longer description',
    );
    expect(mockConsoleLog).toHaveBeenCalledWith('Breaking Change: yes');
    expect(mockConsoleLog).toHaveBeenCalledWith(
      'Breaking Change Description: Description of breaking change',
    );
    expect(mockConsoleLog).toHaveBeenCalledWith('Open Issue: yes');
    expect(mockConsoleLog).toHaveBeenCalledWith('Open issue reference: #123');
  });
});
