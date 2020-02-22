import 'jest';
import { adaptiveModularScale } from '../index';

test('should return string', () => {
  expect(
    adaptiveModularScale(3, {
      ratio: [1.2, 1.67],
      base: [16, 16],
      width: [375, 1440],
      breakpoints: 10,
      lineHeights: {
        '3': [1, 1.5]
      }
    })()
  ).toBe(
    'font-size: 1.728rem; line-height: 1; @media (min-width: 30.094rem) { font-size: 2.021rem; line-height: 1.05; }@media (min-width: 36.750rem) { font-size: 2.314rem; line-height: 1.1; }@media (min-width: 43.406rem) { font-size: 2.607rem; line-height: 1.15; }@media (min-width: 50.063rem) { font-size: 2.900rem; line-height: 1.2; }@media (min-width: 56.719rem) { font-size: 3.193rem; line-height: 1.25; }@media (min-width: 63.375rem) { font-size: 3.486rem; line-height: 1.3; }@media (min-width: 70.031rem) { font-size: 3.779rem; line-height: 1.35; }@media (min-width: 76.688rem) { font-size: 4.072rem; line-height: 1.4; }@media (min-width: 83.344rem) { font-size: 4.365rem; line-height: 1.45; }@media (min-width: 90.000rem) { font-size: 4.657rem; line-height: 1.5; }'
  );
});

test('should use theme', () => {
  expect(
    adaptiveModularScale(3)({
      theme: {
        adaptiveModularScale: {
          ratio: [1.2, 1.67],
          base: [16, 16],
          width: [375, 1440],
          breakpoints: 10,
          lineHeights: {
            '3': [1, 1.5]
          }
        }
      }
    })
  ).toBe(
    'font-size: 1.728rem; line-height: 1; @media (min-width: 30.094rem) { font-size: 2.021rem; line-height: 1.05; }@media (min-width: 36.750rem) { font-size: 2.314rem; line-height: 1.1; }@media (min-width: 43.406rem) { font-size: 2.607rem; line-height: 1.15; }@media (min-width: 50.063rem) { font-size: 2.900rem; line-height: 1.2; }@media (min-width: 56.719rem) { font-size: 3.193rem; line-height: 1.25; }@media (min-width: 63.375rem) { font-size: 3.486rem; line-height: 1.3; }@media (min-width: 70.031rem) { font-size: 3.779rem; line-height: 1.35; }@media (min-width: 76.688rem) { font-size: 4.072rem; line-height: 1.4; }@media (min-width: 83.344rem) { font-size: 4.365rem; line-height: 1.45; }@media (min-width: 90.000rem) { font-size: 4.657rem; line-height: 1.5; }'
  );
});

test('should use custom css property', () => {
  expect(
    adaptiveModularScale(3, {
      ratio: [1.2, 1.67],
      base: [16, 16],
      width: [375, 1440],
      breakpoints: 10,
      property: 'margin-top'
    })()
  ).toBe(
    'margin-top: 1.728rem;  @media (min-width: 30.094rem) { margin-top: 2.021rem;  }@media (min-width: 36.750rem) { margin-top: 2.314rem;  }@media (min-width: 43.406rem) { margin-top: 2.607rem;  }@media (min-width: 50.063rem) { margin-top: 2.900rem;  }@media (min-width: 56.719rem) { margin-top: 3.193rem;  }@media (min-width: 63.375rem) { margin-top: 3.486rem;  }@media (min-width: 70.031rem) { margin-top: 3.779rem;  }@media (min-width: 76.688rem) { margin-top: 4.072rem;  }@media (min-width: 83.344rem) { margin-top: 4.365rem;  }@media (min-width: 90.000rem) { margin-top: 4.657rem;  }'
  );
});

test('should use default breakpoints', () => {
  expect(
    adaptiveModularScale(3, {
      ratio: [1.2, 1.67],
      base: [16, 16],
      width: [375, 1440]
    })()
  ).toBe(
    'font-size: 1.728rem;  @media (min-width: 31.758rem) { font-size: 2.094rem;  }@media (min-width: 40.078rem) { font-size: 2.460rem;  }@media (min-width: 48.398rem) { font-size: 2.827rem;  }@media (min-width: 56.719rem) { font-size: 3.193rem;  }@media (min-width: 65.039rem) { font-size: 3.559rem;  }@media (min-width: 73.359rem) { font-size: 3.925rem;  }@media (min-width: 81.680rem) { font-size: 4.291rem;  }@media (min-width: 90.000rem) { font-size: 4.657rem;  }'
  );
});

test('should use corrections object', () => {
  expect(
    adaptiveModularScale(3, {
      ratio: [1.2, 1.67],
      base: [16, 16],
      width: [375, 1440],
      corrections: {
        '3': [1, -2]
      }
    })()
  ).toBe(
    'font-size: 1.790rem;  @media (min-width: 31.758rem) { font-size: 2.133rem;  }@media (min-width: 40.078rem) { font-size: 2.476rem;  }@media (min-width: 48.398rem) { font-size: 2.819rem;  }@media (min-width: 56.719rem) { font-size: 3.161rem;  }@media (min-width: 65.039rem) { font-size: 3.504rem;  }@media (min-width: 73.359rem) { font-size: 3.847rem;  }@media (min-width: 81.680rem) { font-size: 4.190rem;  }@media (min-width: 90.000rem) { font-size: 4.532rem;  }'
  );
});

test('should throw error', () => {
  expect(adaptiveModularScale(0)).toThrowError(
    'No config or theme object with adaptiveModularScale key provided.'
  );
});
