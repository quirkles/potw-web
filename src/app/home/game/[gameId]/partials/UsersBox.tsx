import Link from "next/link";
import { styled } from "styled-components";

import { useUrlParams } from "@/app/hooks/useUrlParams";
import { ColorName, getColor } from "@/app/styles/colors";
import { defaultBorderRadius } from "@/app/styles/consts";

import { useAppSelector } from "@/app/store/hooks";
import { StoreFetchedUser } from "@/app/store/schemas/user";
import { selectVotesForGame } from "@/app/store/selectors/games";
import { selectFetchedUsersBySqlIds } from "@/app/store/selectors/users";
import { RootState } from "@/app/store/store";

import Heading from "@/components/heading/Heading";
import { FlexContainer, FlexItem } from "@/components/layout/FlexContainer";
import Spacer from "@/components/spacer/Spacer";
import Span from "@/components/text/Span";

import { emailWithoutDomain } from "@/utils/string";

const Styled = styled.div`
  background-color: ${getColor("lightGrey_100")};
  border-radius: ${defaultBorderRadius};
  border: 1px solid ${getColor("grey_100")};
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
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
    <Styled>
      <FlexItem>
        <FlexContainer $alignItems="center">
          <FlexItem $grow={1}>
            <Spacer $padding="small">
              <Heading $variant="h2" $underline $color={color}>
                User
              </Heading>
            </Spacer>
          </FlexItem>
          <Spacer $padding="small">
            <Heading $variant="h2" $color={color}>
              Votes
            </Heading>
          </Spacer>
        </FlexContainer>
      </FlexItem>
      {usersSortedByVoteTotal.map((user) => (
        <UserItem key={user.sqlId} user={user} />
      ))}
    </Styled>
  );
}

const StyledUserItem = styled.div`
  padding: 1rem 1rem;
  border-radius: ${defaultBorderRadius};
  color: ${getColor("black")};
  display: flex;
  align-items: center;
  gap: 1rem;
  border-top: 1px solid ${getColor("grey_100")};
`;

function UserItem({
  user,
}: {
  user: StoreFetchedUser & {
    voteTotal: number;
  };
}) {
  return (
    <StyledUserItem>
      <FlexItem $grow={1}>
        <Link href={`/home/user/${user.sqlId}`}>
          {user.username || emailWithoutDomain(user.email)}
        </Link>
      </FlexItem>
      <Span>{user.voteTotal}</Span>
    </StyledUserItem>
  );
}
