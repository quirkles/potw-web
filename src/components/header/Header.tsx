import styled from 'styled-components'
import Button, {ButtonSize} from "@/components/button/Button";
import {COLORS} from "@/app/styles/colors";
import {LogoutSvg, MusicSvg} from "@/components/icons";

const StyledHeader = styled.header`
    display: flex;
    flex-direction: row;
    height: 4em;
    padding: 0 2em;
    background-image: linear-gradient(to right top, #ffd166, #ffb952, #ffa043, #ff863b, #ff683a, #ff5048, #ff3458, #ff006a, #ff008c, #f800b1, #e42bd8, #c04cfd);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    > div {
        display: flex;
        height: 100%;
        flex-grow: 1;
        align-items: center;
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
`

interface HeaderProps {
    handleLogout: () => void;
    email: string;
}
export default function Header(props: HeaderProps) {
    return (
        <StyledHeader>
            <div className="left">{props.email}</div>
            <div className="middle">
                <Button buttonText="New Game" color={COLORS.green} Icon={MusicSvg} route='/home/create' size={ButtonSize.sm}></Button>
            </div>
            <div className="right">
                <Button buttonText={"Logout"} onClick={props.handleLogout} Icon={LogoutSvg} size={ButtonSize.sm}></Button>
            </div>
        </StyledHeader>
    );
}