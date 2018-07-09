export const firstLetterCaps = str => {
  if (!str) {
    return 'N/A';
  }
  return `${str[0].toUpperCase()}${str.slice(1, str.length)}`;
};
