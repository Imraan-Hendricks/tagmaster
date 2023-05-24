import { promptSelect } from '../../prompts/prompt-select/prompt-select';

export async function selectCommitType() {
  const commitType = await promptSelect('Select a commit type:', [
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
  return commitType;
}
