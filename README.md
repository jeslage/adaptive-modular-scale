# Adaptive Modular Scale

[![npm version](https://badge.fury.io/js/adaptive-modular-scale.svg)](https://www.npmjs.com/package/adaptive-modular-scale)

A small javascript helper to get an adaptive modular scale font-size css string. It will interpolate between two modular scales and breakpoints and will return you sizes based on the given modular scales. This package is inspired by this [tool](https://codepen.io/tol-is/pen/mQVLPY) by Florian Schulz.

```bash
yarn add adaptive-modular-scale

npm install adaptive-modular-scale
```

## Usage

```js
import styled from 'styled-components';
import adaptiveModularScale from 'adaptive-modular-scale';

const Headline = styled.h1`
  ${adaptiveModularScale(3, {
    // Minimum and maximum base
    base: [14, 16],
    // Minimum and maximum ratio
    ratio: [1.2, 1.78],
    // Two screen widths to interpolate between
    width: [320, 960],
    // Number of breakpoints between two widths
    breakpoints: 8,
    // Optional corrections for steps
    corrections: {
      // Correct minimal and maximum size for step. The below example
      // will correct the minimal step by -1px and the maximum step by +2px
      0: [-1, 2]
    }
  })}
`;
```

The above example will return the following css.

```css
.sc-bZQynM {
  font-size: 2.9375rem;

  @media (min-width: 25rem) {
    font-size: 3.1875rem;
  }
  @media (min-width: 30rem) {
    font-size: 3.4375rem;
  }
  @media (min-width: 35rem) {
    font-size: 3.6875rem;
  }
  @media (min-width: 40rem) {
    font-size: 3.9375rem;
  }
  @media (min-width: 45rem) {
    font-size: 4.1875rem;
  }
  @media (min-width: 50rem) {
    font-size: 4.4375rem;
  }
  @media (min-width: 55rem) {
    font-size: 4.6875rem;
  }
  @media (min-width: 60rem) {
    font-size: 4.9375rem;
  }
}
```

## ThemeProvider

You can also add an `adaptiveModularScale` key to the theme object of your ThemeProvider.

**Example**

```js
import styled, { ThemeProvider } from 'styled-components';
import adaptiveModularScale from 'adaptive-modular-scale';

const theme = {
  adaptiveModularScale: {
    base: [14, 16],
    ratio: [1.2, 1.78],
    width: [320, 960],
    breakpoints: 8
  }
};

// If you added the modular scale values to the ThemeProvider
// you dont have to pass it down every time
const Headline = styled.h1`
  ${adaptiveModularScale(5)}
`;

const App = () => (
  <ThemeProvider theme={theme}>
    <Headline>An adaptive modular scale sized headline</Headline>
  </ThemeProvider>
);
```

## Custom css property

By default `adaptive-modular-scale` uses `font-size` as the css property. But you can also change the property by adding a property key to your config object.

**Example**

```js
import styled, { ThemeProvider } from 'styled-components';
import adaptiveModularScale from 'adaptive-modular-scale';

const Headline = styled.h1`
  ${adaptiveModularScale(5, { property: 'margin-bottom' })}
`;
```

## Options

### `step`

`number` | required

The step on the modular scale

### `config`

`object` | required

### `config.base`

`number[]` | required

Array of minimum and maximum base size of modular scale.

### `config.ratio`

`number[]` | required

Array of minimum and maximum ratio of modular scale.

### `config.width`

`number[]` | required

Array of two screen widths in px. Between these values the modular scale will interpolate between both scales based on screen width.

### `config.breakpoints`

`number` | required

Number of breakpoints between the two given screen widths which will be rendered to the css string.

### `config.corrections`

`{ [step]: number[] }` | optional

Add optional corrections object with steps as keys.

```js
const corrections = {
  // This will correct the minimal size of step "0" by -2px
  // and the maximum size by +1px
  0: [-2, 1]
};
```

### `config.property`

`string` | optional | default: "font-size"

Add optional css property if you want to use adaptive modular scale for another property than font-size.

## Additional methods

`adaptive-modular-scale` also exports a default modular scale method.

```js
import styled from 'styled-components';
import { modularScale } from 'adaptive-modular-scale';

const base = 16;
const ratio = 1.6;

const Headline = styled.h1`
  font-size: ${modularScale(5, base, ratio)}px;
`;
```
