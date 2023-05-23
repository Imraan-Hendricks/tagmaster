import { commit } from './commit/commit';
import { license } from './license/license';
import { promptSelect } from './prompts/prompt-select/prompt-select';
import { release } from './release/release';

export default async function main() {
  console.log('Welcome to TagMaster\n');

  const action = await promptSelect('Select an action: ', [
    { ref: '1', action: 'commit', description: 'Make a commit' },
    { ref: '2', action: 'release', description: 'Perform a release' },
    { ref: '3', action: 'license', description: 'Generate a license' },
  ]);
  console.log(action + '\n');

  if (action === 'commit') return await commit();
  if (action === 'release') return await release();
  if (action === 'license') return await license();

  console.error(
    'TagMaster has encountered an issue and will exit to ensure stability.',
  );
  process.exit(1);
}
