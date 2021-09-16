export const getHalf = (number) => {
  if (typeof number !== 'number') {
    return 0;
  }

  const result = number / 2;

  if (Number.isNaN(result)) {
    return 0;
  }

  if (!Number.isFinite(result)) {
    return 0;
  }

  return result;
};

export default {
  getHalf,
};
