import type { Meta, StoryObj } from "@storybook/react";

import PeriodSelect from "@/components/form/PeriodSelect";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Form/PeriodSelect",
  component: PeriodSelect,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onChange: {
      description: "Callback for when the period changes",
      action: "changed",
    },
  },
} satisfies Meta<typeof PeriodSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    selectedPeriod: "weekly",
  },
};
