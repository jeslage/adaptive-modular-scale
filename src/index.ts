import { modularScale, calculateSize, px2rem } from './helper';

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
  const { width, base, ratio, numberOfBreakpoints } =
    props.theme.adaptiveModularScale || config;

  const minFontSize = modularScale(step, base[0], ratio[0]);
  const maxFontSize = modularScale(step, base[1], ratio[1]);

  const steps = (width[1] - width[0]) / numberOfBreakpoints;
  let breakpointsString = ``;

  for (let i = width[0] + steps; i <= width[1]; i += steps) {
    const size = calculateSize(i, width[0], width[1], minFontSize, maxFontSize);

    const mediaQuery = px2rem(i);
    const fontSize = px2rem(size);

    breakpointsString += `@media (min-width: ${mediaQuery}) { font-size: ${fontSize}; }`;
  }

  return `font-size: ${px2rem(minFontSize)};${breakpointsString}`;
};

export default adaptiveModularScale;
export { modularScale, adaptiveModularScale };
