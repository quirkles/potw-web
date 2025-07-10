import type { Meta, StoryObj } from "@storybook/react";

import { baseColors } from "@/app/styles/colors";

import Heading from "@/components/heading/Heading";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Heading",
  component: Heading,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: {
      control: "text",
      description: "The text content of the heading",
    },
    $variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      description: "The HTML heading element to render",
    },
    $textTransform: {
      control: "select",
      options: ["none", "uppercase", "lowercase", "capitalize"],
      description: "Text transformation to apply",
    },
    $color: {
      control: "select",
      options: [
        ...baseColors,
        ...baseColors.map((color) => `${color}_100`),
        ...baseColors.map((color) => `${color}_200`),
        ...baseColors.map((color) => `${color}_300`),
        ...baseColors.map((color) => `${color}_400`),
        ...baseColors.map((color) => `${color}_500`),
        ...baseColors.map((color) => `${color}_600`),
        ...baseColors.map((color) => `${color}_700`),
        ...baseColors.map((color) => `${color}_800`),
        ...baseColors.map((color) => `${color}_900`),
      ],
      description: "The color of the heading text",
    },
    $font: {
      control: "select",
      options: ["mono", "sans", "serif"],
      description: "The font family to use",
    },
    $underline: {
      control: "boolean",
      description: "Whether to underline the heading",
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    children: "Example Heading",
    $variant: "h1",
    $textTransform: "none",
    $color: "blue",
    $font: "mono",
    $underline: false,
  },
};

export const H2WithUnderline: Story = {
  args: {
    children: "H2 With Underline",
    $variant: "h2",
    $textTransform: "none",
    $color: "red",
    $font: "mono",
    $underline: true,
  },
};

export const H3Uppercase: Story = {
  args: {
    children: "H3 Uppercase",
    $variant: "h3",
    $textTransform: "uppercase",
    $color: "green",
    $font: "sans",
    $underline: false,
  },
};

export const H4Serif: Story = {
  args: {
    children: "H4 Serif Font",
    $variant: "h4",
    $textTransform: "none",
    $color: "purple",
    $font: "serif",
    $underline: false,
  },
};

export const H5WithWeightedColor: Story = {
  args: {
    children: "H5 With Weighted Color",
    $variant: "h5",
    $textTransform: "none",
    $color: "blue_700",
    $font: "mono",
    $underline: false,
  },
};

export const H6Capitalized: Story = {
  args: {
    children: "h6 capitalized text",
    $variant: "h6",
    $textTransform: "capitalize",
    $color: "orange",
    $font: "sans",
    $underline: true,
  },
};
