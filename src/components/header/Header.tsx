import styled from 'styled-components'
import Button from "@/components/button/Button";

const StyledHeader = styled.header``

interface HeaderProps {
    handleLogout: () => void;
}
export default function Header(props: HeaderProps) {
    return (
        <StyledHeader>
            <Button buttonText={"Logout"} onClick={props.handleLogout}></Button>
        </StyledHeader>
    );
}