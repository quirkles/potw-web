import styled from "styled-components";

import { searchByEmail } from "@/app/services/user/searchByEmail";

import Heading from "@/components/heading/Heading";
import P from "@/components/text/P";
import TypeAhead from "@/components/typeahead/TypeAhead";

interface IManageUsersProps {}

const StyledManageUsers = styled.div`
  input {
    &:focus {
      outline: none;
    }
  }
`;

function InviteUsers(props: IManageUsersProps) {
  const {} = props;
  return (
    <StyledManageUsers>
      <Heading variant="h2">Invite users</Heading>
      <P>
        Invite users to this game by email. New users will be invited to the
        platform
      </P>
      <TypeAhead placeholder="alice@google.com" onValueChange={searchByEmail} />
    </StyledManageUsers>
  );
}

export default InviteUsers;
