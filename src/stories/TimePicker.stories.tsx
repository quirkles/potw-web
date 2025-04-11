import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";

import Timepicker from "@/components/form/Timepicker";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/TimePicker",
  component: Timepicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    value: {
      description: "The initial time",
      control: {
        type: "date",
      },
    },
    onChange: {
      description: "Callback for when the date changes",
      action: "changed",
    },
  },
} satisfies Meta<typeof Timepicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    value: "17:00",
  },
  render: function Render(args) {
    const { onChange = () => null } = args;
    const [{ value }, updateArgs] = useArgs();
    const changeHandler = (date: string) => {
      onChange(date);
      updateArgs({ value: date });
    };
    return <Timepicker value={value} onChange={changeHandler} />;
  },
};
