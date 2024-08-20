import type { Meta, StoryObj } from "@storybook/react";

import { INotification } from "@/app/providers/Notifications";

import { Notification } from "@/components/notifications/Notifications";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/Notification",
  component: Notification,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    type: {
      control: {
        type: "select",
      },
      options: ["SUCCESS", "ERROR", "WARNING", "INFO"],
    },
    title: {
      control: {
        type: "text",
      },
    },
    message: {
      control: {
        type: "text",
      },
    },
    onDismiss: {
      action: "dismissed",
    },
  } as any,
  render: ({ type, title, message, onDismiss }: any) => {
    const notification: INotification = {
      id: "notification-id",
      type,
      title,
      message,
    };
    return <Notification notification={notification} onDismiss={onDismiss} />;
  },
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    type: "SUCCESS",
    message: "Danny stevens",
    title: "Hi!",
  } as any,
};
