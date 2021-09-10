import stc from 'string-to-color';

const convertColor = (string) => {
  const color = stc(string);
  const colorNumber = (parseInt(color.substr(1), 16) << 8) / 256;
  return colorNumber;
};

export default convertColor;
