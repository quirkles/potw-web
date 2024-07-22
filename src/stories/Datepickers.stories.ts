import type { Meta, StoryObj } from "@storybook/react";
import Datepicker from "@/components/form/Datepicker";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/Datepicker",
  component: Datepicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    initialDate: {
      description: "The initial date",
      control: {
        type: "date",
      },
    },
    onChange: {
      description: "Callback for when the date changes",
      action: "changed",
    },
  },
} satisfies Meta<typeof Datepicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    initialDate: "2024-01-01",
  },
};
