import type { Meta, StoryObj } from "@storybook/react";

import Button from "@/components/button/Button";
import AlarmClock from "@/components/icons/AlarmClock";
import AlbumListSvg from "@/components/icons/AlbumList.svg";
import Calendar from "@/components/icons/Calendar.svg";
import Check from "@/components/icons/Check.svg";
import Clock from "@/components/icons/Clock.svg";
import Music from "@/components/icons/Music.svg";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    buttonText: { control: "text" },
    color: { control: "select" },
    Icon: {
      control: { type: "select" },
      options: [
        "none",
        "AlarmClock",
        "AlbumList",
        "Calendar",
        "Clock",
        "Check",
        "Music",
      ],
      mapping: {
        none: undefined,
        AlarmClock: AlarmClock,
        AlbumList: AlbumListSvg,
        Calendar: Calendar,
        Clock: Clock,
        Check: Check,
        Music: Music,
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    buttonText: "Primary Button",
    color: "blue",
    Icon: undefined, // Default to no icon
  },
};
