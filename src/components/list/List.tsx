// src/components/list/List.tsx

import React from "react";
import { styled } from "styled-components";

import { FlexContainer } from "@/components/layout/FlexContainer";

// Define the props for the List component
interface ListProps<T> {
  items: T[];
  renderItem?: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string;
  orderBy?: (a: T, b: T) => number;
  ListHeaderComponent?: React.ReactNode;
  ListFooterComponent?: React.ReactNode;
  ListEmptyComponent?: React.ReactNode;
  horizontal?: boolean;
}

// Styled components for the list
const StyledList = styled.ul<{ $horizontal?: boolean }>`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: ${(props) => (props.$horizontal ? "flex" : "block")};
  flex-direction: ${(props) => (props.$horizontal ? "row" : "column")};
  overflow-x: ${(props) => (props.$horizontal ? "auto" : "visible")};
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

// The generic List component
function List<T>({
  items,
  renderItem = (item: T, _index: number) => <>{String(item)}</>,
  keyExtractor = (item: T, index: number) => String(index),
  orderBy = (a: T, b: T) => 0,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  horizontal = false,
}: ListProps<T>) {
  if (items.length === 0 && ListEmptyComponent) {
    return <>{ListEmptyComponent}</>;
  }

  return (
    <FlexContainer $direction={horizontal ? "row" : "column"} $gap="small">
      {ListHeaderComponent || null}
      <StyledList $horizontal={horizontal}>
        {items.sort(orderBy).map((item, index) => (
          <ListItem key={keyExtractor(item, index)}>
            {renderItem(item, index)}
          </ListItem>
        ))}
      </StyledList>
      {ListFooterComponent || null}
    </FlexContainer>
  );
}

export default List;
