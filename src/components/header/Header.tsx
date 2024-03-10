import styled from 'styled-components'
import Button, {ButtonSize} from "@/components/button/Button";
import {B} from "@mobily/ts-belt";

const StyledHeader = styled.header`
    display: flex;
    flex-direction: row;
    height: 4em;
    border-bottom: 1px solid white;
    margin: 0 1em;
    > div {
        display: flex;
        height: 100%;
        flex-grow: 1;
        align-items: center;
    }
    .left {
        justify-content: flex-start;
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
            <div className="middle"></div>
            <div className="right">
                <Button buttonText={"Logout"} onClick={props.handleLogout} size={ButtonSize.sm}></Button>
            </div>
        </StyledHeader>
    );
}