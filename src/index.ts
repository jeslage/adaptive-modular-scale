export interface Theme {
  adaptiveModularScale: {
    base: number[];
    ratio: number[];
    width: number[];
    breakpoints: number;
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
  breakpoints: number;
}

const calculateSize = (
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
export const px2rem = (px: number): string => `${px / 16}rem`;

/**
 * Returns adaptive modular scale css font-size string
 * @param  {number} step - Step of the modular scale
 * @param  {object} config - Config object with base, ratio, width and breakpoints key
 * @example adaptiveModularScale(3, { base: [14, 16], ratio: [1.4, 1.67], width: [320, 960], breakpoints: 10 })
 * @returns {string} Resulting adaptive modular scale css font-size string
 */
export const adaptiveModularScale = (step: number, config: Config) => (
  props: FunctionProps
): string => {
  const { adaptiveModularScale: ams } = props.theme;
  const { width, base, ratio, breakpoints } = ams || config;

  const minSize = modularScale(step, base[0], ratio[0]);
  const maxSize = modularScale(step, base[1], ratio[1]);

  const steps = (width[1] - width[0]) / breakpoints;
  let breakpointsString = ``;

  for (let i = width[0] + steps; i <= width[1]; i += steps) {
    const size = calculateSize(i, width[0], width[1], minSize, maxSize);

    const mediaQuery = px2rem(i);
    const fontSize = px2rem(size);

    breakpointsString += `@media (min-width: ${mediaQuery}) { font-size: ${fontSize}; }`;
  }

  return `font-size: ${px2rem(minSize)};${breakpointsString}`;
};

export default adaptiveModularScale;
