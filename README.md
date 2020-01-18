# Adaptive Modular Scale

A small javascript helper to get an adaptive modular scale font-size css string. This package is inspired by this little [tool](https://codepen.io/tol-is/pen/mQVLPY) by Florian Schulz.

```bash
yarn add adaptive-modular-scale

npm install adaptive-modular-scale
```

## Example

```js
import styled from 'styled-components';
import adaptiveModularScale from 'adaptive-modular-scale';

const base = [14, 16];
const ratio = [1.2, 1.78];
const width = [320, 960];
const numberOfBreakpoints = 8;

const Headline = styled.h1`
  ${adaptiveModularScale(3, base, ratio, width, numberOfBreakpoints)}
`;
```

will return the following font-size css

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

## ThemeProvider Example

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
    numberOfBreakpoints: 8
  }
};

// If you added the modular scale values to the ThemeProvider you dont have to pass it down every time
const Headline = styled.h1`
  ${adaptiveModularScale(5)}
`;

const App = () => (
  <ThemeProvider theme={theme}>
    <Headline>A adaptive modular scaled headline</Headline>
  </ThemeProvider>
);
```
