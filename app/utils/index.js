export const firstLetterCaps = str => {
  if (!str) {
    return 'N/A';
  }
  return `${str[0].toUpperCase()}${str.slice(1, str.length)}`;
};

export const formatNumberWithCommas = function (num) {
  if (!num || num === null || num === undefined) {
    return num;
  }
  const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (formatted.includes('.')) {
    const split = formatted.split('.');
    return split[0] + '.' + split[1].replace(/,/g, '');
  } else {
    return formatted;
  }
};
