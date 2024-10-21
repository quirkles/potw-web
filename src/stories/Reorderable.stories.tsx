import type { Meta, StoryObj } from "@storybook/react";

import { GridContainer, GridItem } from "@/components/layout/Grid";
import {
  ReorderableContainer,
  ReorderableItem,
} from "@/components/layout/Reorderable/Reorderable";
import Spacer from "@/components/spacer/Spacer";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/Reorderable",
  component: ReorderableContainer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof ReorderableContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  render: () => (
    <Spacer $padding="small">
      <ReorderableContainer>
        <span>Item 1</span>
        <span>Item 2</span>
        <span>Item 3</span>
      </ReorderableContainer>
    </Spacer>
  ),
};

export const WithMoreItems: Story = {
  render: () => (
    <Spacer $padding="small">
      <ReorderableContainer>
        <ReorderableItem id="alice">
          <GridContainer>
            <GridItem>
              <h1>Alice</h1>
            </GridItem>
            <GridItem>
              <p>Some text here</p>
            </GridItem>
          </GridContainer>
        </ReorderableItem>
        <ReorderableItem id="bob">
          <GridContainer>
            <GridItem>
              <h1>Bob</h1>
            </GridItem>
            <GridItem>
              <p>Some text here</p>
            </GridItem>
          </GridContainer>
        </ReorderableItem>
        <ReorderableItem id="charlie">
          <GridContainer>
            <GridItem>
              <h1>Charlie</h1>
            </GridItem>
            <GridItem>
              <p>Some text here</p>
            </GridItem>
          </GridContainer>
        </ReorderableItem>
        <ReorderableItem id="dani">
          <GridContainer>
            <GridItem>
              <h1>Dani</h1>
            </GridItem>
            <GridItem>
              <p>Some text here</p>
            </GridItem>
          </GridContainer>
        </ReorderableItem>
        <ReorderableItem id="eve">
          <GridContainer>
            <GridItem>
              <h1>Eve</h1>
            </GridItem>
            <GridItem>
              <p>Some text here</p>
            </GridItem>
          </GridContainer>
        </ReorderableItem>
      </ReorderableContainer>
    </Spacer>
  ),
};
