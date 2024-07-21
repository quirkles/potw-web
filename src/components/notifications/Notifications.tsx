import styled from "styled-components";
import {
  INotification,
  NotificationType,
  NotificationTypes,
} from "@/app/providers/Notifications";
import { COLORS } from "@/app/styles/colors";
import Heading from "@/components/heading/Heading";
import P from "@/components/text/P";

const StyledNotifications = styled.div`
  height: 0;
  width: 0;
  ul {
    position: fixed;
    top: 0;
    right: 0;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      background-color: white;
      border: 1px solid black;
      padding: 1em;
      margin: 0.5em;
    }
  }
`;

export function Notifications() {
  return <StyledNotifications></StyledNotifications>;
}

const variants: {
  [key in NotificationType]: {
    backgroundColor: string;
    color: string;
  };
} = {
  SUCCESS: {
    backgroundColor: COLORS.green,
    color: "white",
  },
  ERROR: {
    backgroundColor: COLORS.red,
    color: "white",
  },
  WARNING: {
    backgroundColor: COLORS.yellow,
    color: "black",
  },
  INFO: {
    backgroundColor: COLORS.blue,
    color: "white",
  },
};

const StyledNotification = styled.div<{
  $type: NotificationType;
}>`
  position: relative;
  padding: 0.5em 2em 0.5em 1em;
  margin: 0.5em 0;
  font-size: x-small;
  color: ${(props) => variants[props.$type].color};
  background-color: ${(props) => variants[props.$type].backgroundColor};
  h3 {
    text-decoration: none;
    border-bottom: 1px solid ${(props) => variants[props.$type].color};
  }
  .dismiss {
    position: absolute;
    right: 0.5em;
    top: 0.5em;
    cursor: pointer;
  }
`;

type NotificationProps = {
  notification: Omit<INotification, "durationMs">;
  onDismiss: (id: string) => void;
};

export function Notification(props: NotificationProps) {
  const { notification, onDismiss } = props;
  const { title, message, type = NotificationTypes.INFO, id } = notification;
  return (
    <StyledNotification $type={type}>
      <div className="dismiss" onClick={() => onDismiss(id)}>
        X
      </div>
      {title && <Heading variant="h3">{title}</Heading>}
      <P>{message}</P>
    </StyledNotification>
  );
}
