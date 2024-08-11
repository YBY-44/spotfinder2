export const radians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};
export const randExp = (min = 0, max = 10, lambda = 4) => {
  const randomValue = Math.random();
  const expValue = Math.pow(randomValue, lambda);
  const range = max - min;
  return min + expValue * range;
};
