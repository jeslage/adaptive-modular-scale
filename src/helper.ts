export const calculateFontSize = (
  width: number,
  scaleFrom: number,
  scaleUntil: number,
  minFontSize: number,
  maxFontSize: number
) => {
  return Math.round(
    minFontSize +
      (maxFontSize - minFontSize) *
        ((width - scaleFrom) / (scaleUntil - scaleFrom))
  );
};

/**
 * Returns modular scale value
 * @param  {number} steps - Step of the modular scale
 * @param  {number} base - Base size of the modular scale
 * @param  {number} ratio - Ratio of the modular scale
 * @returns {number} Resulting modular scale value
 */
export const modularScale = (steps: number, base: number, ratio: number) => {
  return Math.round(base * ratio ** steps);
};

/**
 * Transform px value to rem value.
 * @param {number} px - PX value as a integer. e.g. 12
 * @returns {string} - PX value in REM
 * @example ${px2rem(25)}
 */
export const px2rem = (px: number) => {
  return `${px / 16}rem`;
};
