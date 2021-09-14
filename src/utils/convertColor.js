import stc from 'string-to-color';

const convertColor = (string) => {
  if (typeof string !== 'string') {
    return 0;
  }

  if (!string.length) {
    return 0;
  }

  const color = string[0] !== '#' ? stc(string) : string;

  return parseInt(color.slice(1), 16);
};

export default convertColor;
