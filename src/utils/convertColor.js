import stc from 'string-to-color';

const convertColor = (string) => {
  const color = stc(string);
  // eslint-disable-next-line no-bitwise
  const colorNumber = (parseInt(color.substr(1), 16) << 8) / 256;
  return colorNumber;
};

export default convertColor;
