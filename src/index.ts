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

export interface Config {
  base: number[];
  ratio: number[];
  width: number[];
  numberOfBreakpoints: number;
}

/**
 * Returns adaptive modular scale css font-size string
 * @param  {number} step - Step of the modular scale
 * @param  {object} config - Config object with base, ratio, width and numberOfBreakpoints key
 * @example adaptiveModularScale(3, { base: [14, 16], ratio: [1.4, 1.67], width: [320, 960], numberOfBreakpoints: 10 })
 * @returns {string} Resulting adaptive modular scale css font-size string
 */
const adaptiveModularScale = (step: number, config: Config) => (
  props: FunctionProps
): string => {
  const { adaptiveModularScale } = props.theme;
  const [scaleFrom, scaleUntil] = adaptiveModularScale.width || config.width;
  const [minBase, maxBase] = adaptiveModularScale.base || config.base;
  const [minRatio, maxRatio] = adaptiveModularScale.ratio || config.ratio;
  const breakpoints =
    adaptiveModularScale.numberOfBreakpoints || config.numberOfBreakpoints;

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

  return `font-size: ${px2rem(minFontSize)};${breakpointsString}`;
};

export default adaptiveModularScale;
