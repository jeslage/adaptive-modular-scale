import { modularScale, calculateFontSize, px2rem } from './helper';

export interface Theme {
  adaptiveModularScale: {
    base: number[];
    ratio: number[];
    width: number[];
    numberOfBreakpoints: number;
  };
  [key: string]: any;
}

export interface FunctionProps {
  theme: Theme;
  [key: string]: any;
}

/**
 * Returns adaptive modular scale css font-size string
 * @param  {number} step - Step of the modular scale
 * @param  {array} base - Base sizes of the modular scale
 * @param  {array} ratio - ratio of the modular scale
 * @param  {number} width - Boundaries where the modular scale should scale
 * @param  {number} numberOfBreakpoints - Number of breakpoints between width
 * @example adaptiveModularScale(3, [14, 16], [1.4, 1.67], [320, 960], 10)
 * @returns {string} Resulting adaptive modular scale css font-size string
 */
const adaptiveModularScale = (
  step: number,
  base: number[],
  ratio: number[],
  width: number[],
  numberOfBreakpoints: number
) => (props: FunctionProps): string => {
  const { adaptiveModularScale: ams } = props.theme;
  const [scaleFrom, scaleUntil] = ams.width || width;
  const [minBase, maxBase] = ams.base || base;
  const [minRatio, maxRatio] = ams.ratio || ratio;
  const breakpoints = ams.numberOfBreakpoints || numberOfBreakpoints;

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
