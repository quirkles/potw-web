import type { Meta, StoryObj } from "@storybook/react";

import Icon, { IconTypes } from "@/components/icons";
import { baseColors } from "@/app/styles/colors";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/Icon",
  component: Icon,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    iconType: {
      control: "select",
      values: IconTypes,
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    bgColor: {
      control: "select",
      options: baseColors,
    },
    color: {
      control: "select",
      options: baseColors,
    },
    stroke: {
      control: "select",
      options: baseColors,
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    iconType: IconTypes[0],
  },
};
