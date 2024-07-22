import type { Meta, StoryObj } from "@storybook/react";
import Button from "@/components/button/Button";
import { COLORS } from "@/app/styles/colors";
import { GameSummary } from "@/components/gameSummary/GameSummary";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/GameSummary",
  component: GameSummary,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    game_id: {
      description: "The ID of the game.",
      type: "string",
    },
    game_name: {
      description: "The name of the game.",
      type: "string",
    },
    game_description: {
      description: "The description of the game.",
      type: "string",
    },
    game_isPrivate: {
      description: "Whether the game is private.",
      type: "boolean",
    },
    game_startDate: {
      description: "The start date of the game.",
      type: "string",
    },
    game_endDate: {
      description: "The end date of the game.",
      type: "string",
    },
    game_period: {
      description: "The period of the game.",
      type: "select",
      options: ["daily", "weekly", "monthly", "biWeekly"],
    },
    game_admin_id: {
      description: "The ID of the game admin.",
      type: "string",
    },
    game_admin_email: {
      description: "The email of the game admin.",
      type: "string",
    },
    game_admin_username: {
      description: "The username of the game admin.",
      type: "string",
    },
  } as any,
  render: (args: any) => {
    const props = {
      game: {
        id: args.game_id,
        name: args.game_name,
        description: args.game_description,
        isPrivate: args.game_isPrivate,
        startDate: args.game_startDate,
        endDate: args.game_endDate,
        period: args.game_period,
        players: [],
        admin: {
          sqlId: args.game_admin_id,
          email: args.game_admin_email,
          username: args.game_admin_username,
          firestoreId: "firestore-id",
        },
      },
    };
    return <GameSummary {...props} />;
  },
} satisfies Meta<typeof GameSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    game_id: "game-id",
    game_name: "my game",
    game_description: "my game description",
    game_isPrivate: true,
    game_startDate: "2022-01-01",
    game_endDate: "2022-01-02",
    game_period: "weekly",
    game_admin_id: "game-admin-id",
    game_admin_email: "alice@mail.com",
    game_admin_username: "Alice99",
  } as any,
};
