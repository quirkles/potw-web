import path from "path";

import type { StorybookConfig } from "@storybook/nextjs";


const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  previewBody: (body) => `
    ${body}
    <style>
        * {
            font-family: "Overpass Mono", monospace;
            font-optical-sizing: auto;
            font-weight: 400;
            font-style: normal;
        }
    </style>
  `,
  webpackFinal: async (config) => {
    config.resolve ??= {};
    config.resolve.alias ??= {};
    (config.resolve.alias as any)["@"] = path.resolve(__dirname, "../src") as string;
    return config;
  }
};
export default config;
