import { addChangelong } from './add-changelog/add-changelog';
import { generateChangelog } from './generate-changelog/generate-changelog';
import { performRelease } from './perform-release/perform-release';
import { selectPreid } from './select-preid/select-preid';
import { selectReleaseType } from './select-release-type/select-release-type';

export async function release() {
  const type = await selectReleaseType();
  const preid = await selectPreid(type);
  const { lastTag, secondLastTag } = await performRelease(type, preid);
  await generateChangelog({ lastTag, secondLastTag });
  await addChangelong(lastTag);
}
