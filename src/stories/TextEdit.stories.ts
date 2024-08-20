import type { Meta, StoryObj } from "@storybook/react";

import TextEditable from "@/components/form/TextEditable";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/TextEditable",
  component: TextEditable,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    text: {
      description: "The text to display and edit",
      control: {
        type: "text",
      },
    },
    onChange: {
      description: "Callback for when the text changes",
      action: "changed",
    },
    onBlur: {
      description: "Callback for when the text loses focus",
      action: "blurred",
    },
  },
} satisfies Meta<typeof TextEditable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Hello, world!",
  },
};
