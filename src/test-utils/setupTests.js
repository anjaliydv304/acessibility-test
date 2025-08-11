import 'jest-axe/extend-expect';
import '@testing-library/jest-dom';
import { configureAxe } from 'jest-axe';

// Configure axe for your specific accessibility requirements
const axe = configureAxe({
  rules: {
    // Enable critical accessibility rules
    'color-contrast': { enabled: true },
    'focus-trap': { enabled: true },
    'keyboard': { enabled: true },
    'aria-roles': { enabled: true },
    'aria-required-attr': { enabled: true },
    'aria-valid-attr-value': { enabled: true },
    'button-name': { enabled: true },
    'heading-order': { enabled: true },
    'label': { enabled: true },
    'link-name': { enabled: true },
  },
  tags: ['wcag2a', 'wcag2aa'], // WCAG 2.1 Level AA compliance
});

global.axe = axe;

// Global accessibility test timeout
jest.setTimeout(10000);