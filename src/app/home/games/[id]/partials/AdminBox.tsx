import { styled } from "styled-components";

import { ColorName, getColor } from "@/app/styles/colors";

import { StoreFetchedGame } from "@/app/store/reducers/gamesReducer";
import { StoreUser } from "@/app/store/reducers/usersReducer";

import { useResponsiveContext } from "@/app/providers/Responsive";

import { Avatar } from "@/components/avatar/Avatar";
import Heading from "@/components/heading/Heading";
import { FlexBox } from "@/components/layout/Flexbox";
import P from "@/components/text/P";

const Styled = styled(FlexBox)<{
  $color: ColorName;
}>`
  padding: 2rem;
  border: 2px solid ${(props) => getColor(props.$color)};
  color: ${(props) => getColor(props.$color)};
    height: 100%;
`;

type AdminBoxParams = {
  admin: StoreUser;
  color: ColorName;
  game: StoreFetchedGame;
};
export default function AdminBox({ admin, game, color }: AdminBoxParams) {
  const responsive = useResponsiveContext();
  return (
    <Styled
      $color={color}
      $direction="column"
      $gap={responsive?.isDesktop ? "large" : "medium"}
      $alignItems="center"
    >
      <Avatar
        value={admin.email || ""}
        size={responsive?.isDesktop ? "xLarge" : "large"}
      />
      <Heading variant="h4">
        Game Admin: {admin.username || admin.email}
      </Heading>
      <P>
        Admin is {game.players.includes(admin.sqlId) ? "playing " : "not "}in
        this game
      </P>
    </Styled>
  );
}
