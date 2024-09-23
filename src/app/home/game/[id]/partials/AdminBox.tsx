import { styled } from "styled-components";

import { ColorName, getColor } from "@/app/styles/colors";

import { useResponsiveContext } from "@/app/providers/Responsive";

import { StoreFetchedGame } from "@/app/services/schemas/store/game";
import { StoreFetchedUser, StoreUser } from "@/app/services/schemas/store/user";

import { Avatar } from "@/components/avatar/Avatar";
import Heading from "@/components/heading/Heading";
import { FlexContainer } from "@/components/layout/FlexContainer";
import P from "@/components/text/P";

const Styled = styled(FlexContainer)<{
  $color: ColorName;
}>`
  padding: 2rem;
  border: 2px solid ${(props) => getColor(props.$color)};
  color: ${(props) => getColor(props.$color)};
  height: 100%;
`;

type AdminBoxParams = {
  admin: StoreFetchedUser;
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
      <Heading $variant="h4">
        Game Admin: {admin.username || admin.email}
      </Heading>
      <P>
        Admin is {game.players.includes(admin.sqlId) ? "playing " : "not "}in
        this game
      </P>
    </Styled>
  );
}
