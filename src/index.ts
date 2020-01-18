import { modularScale, calculateFontSize, px2rem } from './helper';

/**
 * Returns adaptive modular scale css font-size string
 * @param  {number} step - Step of the modular scale
 * @param  {array} bases - Base sizes of the modular scale
 * @param  {array} ratios - Ratios of the modular scale
 * @param  {number} widths - Boundaries where the modular scale should scale
 * @param  {number} breakpoints - Number of breakpoints between widths
 * @example adaptiveModularScale(3, [14, 16], [1.4, 1.67], [320, 960], 10)
 * @returns {string} Resulting adaptive modular scale css font-size string
 */
const adaptiveModularScale = (
  step: number,
  bases: Array<number>,
  ratios: Array<number>,
  widths: Array<number>,
  breakpoints: number
) => {
  const [scaleFrom, scaleUntil] = widths;
  const [minBase, maxBase] = bases;
  const [minRatio, maxRatio] = ratios;

  const minFontSize = modularScale(step, minBase, minRatio);
  const maxFontSize = modularScale(step, maxBase, maxRatio);

  const steps = (scaleUntil - scaleFrom) / breakpoints;
  let breakpointsString = ``;

  for (let i = scaleFrom + steps; i <= scaleUntil; i += steps) {
    const size = calculateFontSize(
      i,
      scaleFrom,
      scaleUntil,
      minFontSize,
      maxFontSize
    );

    breakpointsString += `@media (min-width: ${px2rem(
      i
    )}) { font-size: ${px2rem(size)}; }`;
  }

  return `
    font-size: ${px2rem(minFontSize)};

    ${breakpointsString}
`;
};

export default adaptiveModularScale;
