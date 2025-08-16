import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-docs"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  typescript: {
    reactDocgen: false, // Add this to disable react-docgen
  },
};

export default config;