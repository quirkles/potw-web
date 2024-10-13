import Link from "next/link";
import { styled } from "styled-components";

import Button, { ButtonSize } from "@/components/button/Button";
import { Icons } from "@/components/icons";
import AlbumListSvg from "@/components/icons/AlbumList.svg";

import { getColorVariant } from "@/utils/color";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  height: 4em;
  padding: 0 2em;
  background-image: linear-gradient(
    to right top,
    ${getColorVariant("navy")},
    ${getColorVariant("grey")}
  );
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  > div {
    display: flex;
    height: 100%;
    flex-grow: 1;
    align-items: center;
    gap: 1em;
  }
  .left {
    justify-content: flex-start;
    font-size: x-small;
  }
  .middle {
    justify-content: center;
  }
  .right {
    justify-content: flex-end;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

interface HeaderProps {
  handleLogout: () => void;
  user: {
    username: string;
    sqlId: string;
  };
}
export default function Header(props: HeaderProps) {
  return (
    <StyledHeader>
      <div className="left">
        <Link href={`/home/user/${props.user.sqlId}`}>
          {props.user.username}
        </Link>
      </div>
      <div className="middle"></div>
      <div className="right">
        <Button
          buttonText="games"
          color="blue"
          Icon={AlbumListSvg}
          route="/home/game"
          size={ButtonSize.sm}
        ></Button>
        <Button
          buttonText="create"
          color="green"
          Icon={Icons.Music}
          route="/home/create"
          size={ButtonSize.sm}
        ></Button>
        <Button
          color="red"
          buttonText={"Logout"}
          onClick={props.handleLogout}
          Icon={Icons.Logout}
          size={ButtonSize.sm}
        ></Button>
      </div>
    </StyledHeader>
  );
}
