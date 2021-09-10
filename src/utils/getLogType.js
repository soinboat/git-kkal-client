export default function getLogType(log) {
  if (log.length <= 0) {
    return { sign: '', log: '' };
  }

  const sliced = log.slice(1);

  switch (log[0]) {
    case '+':
      return { sign: '+', log: sliced };
    case '-':
      return { sign: '-', log: sliced };
    default:
      return { sign: '', log };
  }
}
