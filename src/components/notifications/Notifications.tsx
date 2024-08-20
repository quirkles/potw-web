"use client";

import { useEffect, useState } from "react";
import { styled } from "styled-components";

import {
  INotification,
  NotificationEventTypes,
  NotificationType,
  NotificationTypes,
  useNotificationsContext,
} from "@/app/providers/Notifications";

import Heading from "@/components/heading/Heading";
import P from "@/components/text/P";

import { getColor } from "@/utils/color";

const StyledNotifications = styled.div`
  height: 0;
  width: 0;
  ul {
    position: fixed;
    bottom: 0;
    right: 1em;
    display: flex;
    flex-direction: column-reverse;
    li {
      position: relative;
    }
  }
`;

export function Notifications() {
  const notificationContext = useNotificationsContext();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const handleDismiss = (id: string) => {
    setNotifications((notifications) =>
      notifications.filter((notification) => notification.id !== id),
    );
  };
  useEffect(() => {
    if (!notificationContext) {
      return;
    }
    const subscription = notificationContext.subscribeToNotificationEvents(
      (notification) => {
        switch (notification.type) {
          case NotificationEventTypes.ADD:
            setNotifications((notifications) => [
              ...notifications,
              notification.payload as INotification,
            ]);
            break;
          case NotificationEventTypes.REMOVE:
            handleDismiss(notification.payload as string);
            break;
        }
      },
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [notificationContext]);
  return (
    <StyledNotifications>
      <ul>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            onDismiss={handleDismiss}
          />
        ))}
      </ul>
    </StyledNotifications>
  );
}

const variants: {
  [key in NotificationType]: {
    backgroundColor: string;
    color: string;
  };
} = {
  SUCCESS: {
    backgroundColor: getColor("green"),
    color: getColor("green", "font"),
  },
  INFO: {
    backgroundColor: getColor("blue"),
    color: getColor("blue", "font"),
  },
  WARNING: {
    backgroundColor: getColor("yellow"),
    color: getColor("yellow", "font"),
  },
  ERROR: {
    backgroundColor: getColor("red"),
    color: getColor("red", "font"),
  },
};

const StyledNotification = styled.li<{
  $type: NotificationType;
}>`
  position: relative;
  padding: 0.5em 2em 0.5em 1em;
  margin: 0.5em 0;
  font-size: small;
  border: 1px solid ${(props) => variants[props.$type].color};
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
    <StyledNotification $type={type} className="notification">
      <div className="dismiss" onClick={() => onDismiss(id)}>
        X
      </div>
      {title && <Heading variant="h3">{title}</Heading>}
      {typeof message === "string" ? <P>{message}</P> : message}
    </StyledNotification>
  );
}
