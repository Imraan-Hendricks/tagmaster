import { prompt } from '../prompt/prompt';

interface Option<T> {
  ref: string;
  action: T;
  description: string;
}

export async function promptSelect<T extends string>(
  instruction: string,
  options: Option<T>[],
) {
  console.log(instruction);
  options.forEach(({ ref, action, description }) =>
    console.log(`${ref}) ` + `${action}: ${description}`),
  );

  let option = await prompt('Enter your choice: ');
  let action: T | undefined;

  while (!action) {
    const filtered = options.filter(({ ref }) => ref === option);
    if (filtered.length === 1) {
      action = filtered[0].action;
      break;
    }
    option = await prompt('Please enter a valid number as your choice: ');
  }

  return action;
}
