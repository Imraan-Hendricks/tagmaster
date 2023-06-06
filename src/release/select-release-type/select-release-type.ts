import { promptSelect } from '../../prompts/prompt-select/prompt-select';

export async function selectReleaseType() {
  const type = await promptSelect('Select a release type:', [
    {
      ref: '1',
      action: 'major',
      description: 'Introduces backward-incompatible changes',
    },
    {
      ref: '2',
      action: 'minor',
      description: 'Adds new features without breaking existing functionality',
    },
    {
      ref: '3',
      action: 'patch',
      description: 'Includes bug fixes and small improvements',
    },
    {
      ref: '4',
      action: 'premajor',
      description: 'Pre-release version with major changes',
    },
    {
      ref: '5',
      action: 'preminor',
      description: 'Pre-release version with minor changes',
    },
    {
      ref: '6',
      action: 'prepatch',
      description: 'Pre-release version with patch-level changes',
    },
    {
      ref: '7',
      action: 'prerelease',
      description: 'Pre-release version for testing purposes',
    },
  ]);

  console.log(type + '\n');
  return type;
}
