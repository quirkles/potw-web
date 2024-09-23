import Link from "next/link";
import { styled } from "styled-components";

import { useUrlParams } from "@/app/hooks/useUrlParams";
import { ColorName, getColor } from "@/app/styles/colors";

import { useAppSelector } from "@/app/store/hooks";
import { selectVotesForGame } from "@/app/store/selectors/games";
import { selectFetchedUsersBySqlIds } from "@/app/store/selectors/users";
import { RootState } from "@/app/store/store";

import { StoreFetchedUser } from "@/app/services/schemas/store/user";

import Heading from "@/components/heading/Heading";
import { FlexContainer, FlexItem } from "@/components/layout/FlexContainer";
import Span from "@/components/text/Span";

import { emailWithoutDomain } from "@/utils/string";

const Styled = styled(FlexContainer)<{
  $color: ColorName;
}>`
  color: ${(props) => getColor(props.$color)};
  > * {
    padding: 1rem 1rem;
    &:not(:first-child) {
      border-bottom: 1px solid ${getColor("grey_300")};
    }
    &:nth-child(1) {
      h1,
      h2,
      h3,
      h4,
      h5 {
        margin: 0;
      }
      padding: 0.5rem 1rem;
      background-color: ${getColor("green_300")};
      text-decoration: underline;
    }
  }
`;

type UsersBoxParams = {
  color: ColorName;
  userIds: string[];
};
export default function UsersBox({ color, userIds }: UsersBoxParams) {
  const users: StoreFetchedUser[] = useAppSelector((state: RootState) =>
    selectFetchedUsersBySqlIds(state, userIds),
  );
  const { gameId } = useUrlParams();

  const gameVotes = useAppSelector((state) =>
    selectVotesForGame(state, gameId),
  );

  const usersSortedByVoteTotal = users
    .map((u) => ({
      ...u,
      voteTotal: gameVotes[u.sqlId] || 0,
    }))
    .sort((a, b) => {
      return a.voteTotal - b.voteTotal;
    });

  return (
    <Styled $color={color} $direction="column" $alignItems="stretch">
      <FlexItem>
        <FlexContainer $alignItems="center">
          <FlexItem $grow={1}>
            <Heading $variant="h4" $underline={true}>
              User
            </Heading>
          </FlexItem>
          <Heading $variant="h4">Votes</Heading>
        </FlexContainer>
      </FlexItem>
      {usersSortedByVoteTotal.map((user) => (
        <FlexItem key={user.sqlId}>
          <FlexContainer $alignItems="center">
            <FlexItem $grow={1}>
              <Link href={`/home/user/${user.sqlId}`}>
                {user.username || emailWithoutDomain(user.email)}
              </Link>
            </FlexItem>
            <Span>{user.voteTotal}</Span>
          </FlexContainer>
        </FlexItem>
      ))}
    </Styled>
  );
}
