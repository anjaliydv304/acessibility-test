module.exports = {
  ...require('./jest.config.cjs'),
  testMatch: [
    '<rootDir>/src/**/*.a11y.(test|spec).{js,jsx,ts,tsx}', // Only a11y tests
  ],
  reporters: [
    'default',
    ['jest-html-reporters', {
      publicPath: './accessibility-reports',
      filename: 'accessibility-report.html',
      pageTitle: 'Accessibility Test Results',
    }],
  ],
  testTimeout: 10000, // Accessibility tests may take longer
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    '!src/components/**/*.stories.{ts,tsx}',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
  coverageDirectory: 'accessibility-coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};