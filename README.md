# Adaptive Modular Scale Helper

A small javascript helper for an adaptive modular scale font-size css string.

```bash
yarn add adaptive-modular-scale

npm install adaptive-modular-scale
```

## Usage

```js
import styled from 'styled-components';
import adaptiveModularScale from 'adaptive-modular-scale';

const base = [14, 16];
const ratio = [1.2, 1.78];
const width = [320, 960];
const numberOfBreakpoints = 8;

const StyledHeadline = styled.h1`
  ${adaptiveModularScale(3, base, ratio, width, numberOfBreakpoints)}
`;
```

will return

```css
.sc-bZQynM {
  font-size: 2.9375rem;

  @media (min-width: 20rem) {
    font-size: 2.9375rem;
  }
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

Inspired by https://codepen.io/tol-is/pen/mQVLPY
