import Link from "next/link";
import { styled } from "styled-components";

import { ColorName, getColor } from "@/app/styles/colors";

import { useAppSelector } from "@/app/store/hooks";
import { StoreUser } from "@/app/store/reducers/usersReducer";
import { selectUsersBySqlIds } from "@/app/store/selectors/users";
import { RootState } from "@/app/store/store";

import { FlexContainer, FlexItem } from "@/components/layout/FlexContainer";

const Styled = styled(FlexContainer)<{
  $color: ColorName;
}>`
  border: 2px solid ${(props) => getColor(props.$color)};
  color: ${(props) => getColor(props.$color)};
  > * {
    padding: 1rem 2rem;
    &:nth-child(odd) {
      background-color: ${getColor("lightGrey_300")};
    }
  }
`;

type UsersBoxParams = {
  color: ColorName;
  userIds: string[];
};
export default function UsersBox({ color, userIds }: UsersBoxParams) {
  const users: StoreUser[] = useAppSelector((state: RootState) =>
    selectUsersBySqlIds(state, userIds),
  );
  return (
    <Styled $color={color} $direction="column" $alignItems="stretch">
      {users.map((user) => (
        <FlexItem key={user.sqlId}>
          <Link href={`/home/users/${user.sqlId}`}>
            {user.username || user.email}
          </Link>
        </FlexItem>
      ))}
    </Styled>
  );
}
