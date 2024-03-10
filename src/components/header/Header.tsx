import styled from 'styled-components'
import Button, {ButtonSize} from "@/components/button/Button";
import {B} from "@mobily/ts-belt";
import {COLORS} from "@/app/styles/colors";
import {LogoutSvg, MusicSvg} from "@/components/icons";

const StyledHeader = styled.header`
    display: flex;
    flex-direction: row;
    height: 4em;
    padding: 0 2em;
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