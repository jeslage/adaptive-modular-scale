export interface Theme {
  adaptiveModularScale: Config;
  [key: string]: any;
}

export interface FunctionProps {
  theme: Theme;
  [key: string]: any;
}

export interface Config {
  base: [number, number];
  ratio: [number, number];
  width: [number, number];
  breakpoints?: number;
  corrections?: {
    [key: string]: [number, number];
  };
  lineHeights?: {
    [key: string]: [number, number];
  };
  property?: string;
}

const calcSize = (
  width: number,
  from: number,
  to: number,
  min: number,
  max: number
): number => {
  return min + (max - min) * ((width - from) / (to - from));
};

/**
 * Returns modular scale value
 * @param  {number} steps - Step of the modular scale
 * @param  {number} base - Base size of the modular scale
 * @param  {number} ratio - Ratio of the modular scale
 * @example modularScale(3, 16, 1.67)
 * @returns {number} Resulting modular scale value
 */
export const modularScale = (steps: number, base: number, ratio: number): number =>
  base * Math.pow(ratio, steps);

/**
 * Transform px value to rem value.
 * @param {number} px - PX value as a integer. e.g. 12
 * @returns {string} - PX value in REM
 * @example ${px2rem(25)}
 */
export const px2rem = (px: number): string => `${(px / 16).toFixed(3)}rem`;

/**
 * Returns adaptive modular scale css font-size string
 * @param  {number} step - Step of the modular scale
 * @param  {object} config - Config object with base, ratio, width and breakpoints key
 * @example adaptiveModularScale(3, { base: [14, 16], ratio: [1.4, 1.67], width: [320, 960], breakpoints: 10 })
 * @returns {string} Resulting adaptive modular scale css font-size string
 */
export const adaptiveModularScale = (step: number, config?: Config) => (
  props?: FunctionProps
): string => {
  const settings = props?.theme?.adaptiveModularScale || config;

  if (typeof settings === 'undefined') {
    throw Error('No config or theme object with adaptiveModularScale key provided.');
  }

  const { width, base, ratio, breakpoints, corrections, lineHeights } = settings;

  const cssProp = config && config.property ? config.property : 'font-size';

  const lineHeight = lineHeights && lineHeights[step] ? lineHeights[step] : undefined;
  const correction = corrections && corrections[step] ? corrections[step] : [0, 0];

  const minSize = modularScale(step, base[0], ratio[0]) + correction[0];
  const maxSize = modularScale(step, base[1], ratio[1]) + correction[1];

  const steps = (width[1] - width[0]) / (breakpoints || 8);

  let mediaQueries = ``;

  for (let i = width[0] + steps; i <= width[1]; i += steps) {
    const size = calcSize(i, width[0], width[1], minSize, maxSize);

    const lh = lineHeight
      ? `line-height: ${calcSize(i, width[0], width[1], lineHeight[0], lineHeight[1])};`
      : '';

    const mq = px2rem(i);
    const fontSize = px2rem(size);

    mediaQueries += `@media (min-width: ${mq}) { ${cssProp}: ${fontSize}; ${lh} }`;
  }

  return `${cssProp}: ${px2rem(minSize)}; ${
    lineHeight ? `line-height: ${lineHeight[0]};` : ''
  } ${mediaQueries}`;
};

export default adaptiveModularScale;
