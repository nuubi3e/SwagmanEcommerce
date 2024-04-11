export const capitalize = (str: string) =>
  str
    .trim()
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' '); // function to capitalize string in JS
