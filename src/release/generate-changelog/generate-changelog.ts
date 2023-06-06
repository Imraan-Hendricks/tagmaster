import { exec } from 'child_process';
import fs from 'fs';

const capeTownTimezone = 'Africa/Johannesburg';
const currentDate = new Date().toLocaleDateString('en-US', {
  timeZone: capeTownTimezone,
});

const filterMessages = function (
  messages: string[],
  filter: string,
  title: string,
) {
  const filtered = messages
    .filter(message => message.startsWith(filter))
    .map(message => `- ${message.split(': ')[1]}\n`);

  if (filtered.length < 1) return [];
  return [`\n### ${title}\n`, ...filtered];
};

export async function generateChangelog({
  lastTag,
  secondLastTag,
}: {
  lastTag: string;
  secondLastTag: string | null;
}) {
  let gitCommand = '';

  if (secondLastTag === null) gitCommand = `git log --pretty=format:"%s"`;
  else gitCommand = `git log ${secondLastTag}..${lastTag} --pretty=format:"%s"`;

  exec(gitCommand, async (error, stdout) => {
    if (error) {
      console.error(`Error executing command`);
      console.error(`Feedback: ${error.message}`);
    }

    const commitMessages = stdout.split('\n');

    const changelogFile = 'changelog.md';
    const newContent = [
      `## ${currentDate}: ${lastTag}\n`,
      ...filterMessages(commitMessages, 'feat', 'Features'),
      ...filterMessages(commitMessages, 'fix', 'Fixes'),
      ...filterMessages(commitMessages, 'refactor', 'Refactors'),
      ...filterMessages(commitMessages, 'test', 'Tests'),
      ...filterMessages(commitMessages, 'chore', 'Chores'),
      ...filterMessages(commitMessages, 'docs', 'Documentation'),
      ...filterMessages(commitMessages, 'style', 'Styles'),
      ...filterMessages(commitMessages, 'build', 'Builds'),
      ...filterMessages(commitMessages, 'ci', 'CI'),
    ].join('');

    let existingContent = '';

    try {
      existingContent = fs.readFileSync(changelogFile, 'utf8');
    } catch (error) {
      console.log(
        `The changelog.md' file does not currently exist, but a new one will be generated.`,
      );
    }

    const updatedContent = `${newContent}\n<br />\n\n${existingContent}`;

    fs.writeFileSync(changelogFile, updatedContent);

    console.log('Updated changelog file!');
  });
}
