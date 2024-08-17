import styled from "styled-components";

import { searchByEmail } from "@/app/services/user/searchByEmail";

import { Colors } from "@/app/styles/colors";

import Heading from "@/components/heading/Heading";
import P from "@/components/text/P";
import TypeAhead from "@/components/typeahead/TypeAhead";
import Button, { ButtonSize } from "@/components/button/Button";
import { FlexBox, FlexItem } from "@/components/layout/Flexbox";

import { isEmail } from "@/utils/string";
import Divider from "@/components/divider/Divider";

interface IManageUsersProps {
  onAddUser: (user: { email: string; firestoreId: string | null }) => void;
  onRemoveUser: (email: string) => void;
  emails: string[];
}

const StyledManageUsers = styled.div`
  input {
    &:focus {
      outline: none;
    }
  }

  ul {
    list-style: none;
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
            firestoreId: selected.value as string,
          });
        }}
        onAddFromInput={(value) => {
          onAddUser({
            email: value,
            firestoreId: null,
          });
        }}
        placeholder="alice@google.com"
        onValueChange={searchByEmail}
        validate={(value) => (isEmail(value) ? null : "Invalid email")}
      />
      <Divider $marginY="small" $width="xSmall" />
      <FlexBox $direction="column" $gap="small">
        {emails.map((email) => (
          <UserListItem
            key={email}
            email={email}
            onRemove={() => {
              props.onRemoveUser(email);
            }}
          />
        ))}
      </FlexBox>
    </StyledManageUsers>
  );
}

const StyledUserListItem = styled(FlexBox)`
    width: 100%;
    padding: 0.5rem 1rem;
    &:nth-child(even) {
        background-color: ${Colors.grey_100};
    }
}
`;

function UserListItem(props: { email: string; onRemove: () => void }) {
  return (
    <StyledUserListItem $alignItems="center">
      <FlexItem $grow={1}>
        <P>{props.email}</P>
      </FlexItem>
      <FlexItem>
        <Button
          size={ButtonSize.sm}
          color="red"
          onClick={props.onRemove}
          buttonText="remove"
        ></Button>
      </FlexItem>
    </StyledUserListItem>
  );
}

export default InviteUsers;
