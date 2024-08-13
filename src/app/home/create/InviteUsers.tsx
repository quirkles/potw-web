import styled from "styled-components";

import { searchByEmail } from "@/app/services/user/searchByEmail";

import Heading from "@/components/heading/Heading";
import P from "@/components/text/P";
import TypeAhead from "@/components/typeahead/TypeAhead";
import { isEmail } from "@/utils/string";

interface IManageUsersProps {
  onAddUser: (user: { email: string; id: string | null }) => void;
  emails: string[];
}

const StyledManageUsers = styled.div`
  input {
    &:focus {
      outline: none;
    }
  }
`;

function InviteUsers(props: IManageUsersProps) {
  const { onAddUser, emails } = props;
  return (
    <StyledManageUsers>
      <Heading variant="h2">Invite users</Heading>
      <P>
        Invite users to this game by email. New users will be invited to the
        platform
      </P>
      <TypeAhead
        onSelect={(selected) => {
          onAddUser({
            email: selected.displayText,
            id: selected.value as string,
          });
        }}
        onAddFromInput={(value) => {
          onAddUser({
            email: value,
            id: null,
          });
        }}
        placeholder="alice@google.com"
        onValueChange={searchByEmail}
        validate={(value) => (isEmail(value) ? null : "Invalid email")}
      />
      <ul>
        {emails.map((email) => (
          <li key={email}>{email}</li>
        ))}
      </ul>
    </StyledManageUsers>
  );
}

export default InviteUsers;
