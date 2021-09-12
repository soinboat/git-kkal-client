export default function getCodeType(code) {
  if (code.length <= 0) {
    return { sign: '', code: '' };
  }

  const sliced = code.slice(1);

  switch (code[0]) {
    case '+':
      return { sign: '+', code: sliced };
    case '-':
      return { sign: '-', code: sliced };
    default:
      return { sign: '', code };
  }
}
