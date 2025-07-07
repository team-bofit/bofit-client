import type { StorybookConfig } from '@storybook/react-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

import { join, dirname } from 'path';

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-onboarding',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    const { default: svgSpritePlugin } = await import(
      '@pivanov/vite-plugin-svg-sprite'
    );

    config.plugins = config.plugins || [];
    config.plugins.push(vanillaExtractPlugin());
    config.plugins.push(
      svgSpritePlugin({
        iconDirs: ['src/icons/assets'],
        symbolId: 'icon-[name]',
        inject: 'body-last',
      }),
    );

    return config;
  },
};

export default config;
