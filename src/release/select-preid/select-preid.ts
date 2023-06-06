import { promptSelect } from '../../prompts/prompt-select/prompt-select';

type ReleaseType =
  | 'major'
  | 'minor'
  | 'patch'
  | 'premajor'
  | 'preminor'
  | 'prepatch'
  | 'prerelease';

export async function selectPreid(type: ReleaseType) {
  if (!type.includes('pre')) return;
  const preid = await promptSelect('Select a release type:', [
    {
      ref: '1',
      action: 'standard',
      description: 'Standard pre-release identifier',
    },
    {
      ref: '2',
      action: 'alpha',
      description: 'Alpha version for testing purposes',
    },
    {
      ref: '3',
      action: 'beta',
      description: 'Beta version for testing purposes',
    },
  ]);

  console.log(preid + '\n');
  return preid === 'standard' ? undefined : preid;
}
