export const calculateSize = (
  width: number,
  from: number,
  to: number,
  min: number,
  max: number
): number => {
  return Math.round(min + (max - min) * ((width - from) / (to - from)));
};

/**
 * Returns modular scale value
 * @param  {number} steps - Step of the modular scale
 * @param  {number} base - Base size of the modular scale
 * @param  {number} ratio - Ratio of the modular scale
 * @example modularScale(3, 16, 1.67)
 * @returns {number} Resulting modular scale value
 */
export const modularScale = (
  steps: number,
  base: number,
  ratio: number
): number => Math.round(base * ratio ** steps);

/**
 * Transform px value to rem value.
 * @param {number} px - PX value as a integer. e.g. 12
 * @returns {string} - PX value in REM
 * @example ${px2rem(25)}
 */
export const px2rem = (px: number): string => {
  return `${px / 16}rem`;
};
