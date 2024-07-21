"use client";

import { createContext, ReactNode, useContext } from "react";
import { Subject, Subscription } from "rxjs";
import { v4 } from "uuid";

export const NotificationTypes = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  WARNING: "WARNING",
  INFO: "INFO",
} as const;

export type NotificationType =
  (typeof NotificationTypes)[keyof typeof NotificationTypes];

export interface INotification {
  id: string;
  type?: NotificationType;
  title?: string;
  message: string;
  durationMs?: number;
}

const NotificationEventTypes = {
  ADD: "ADD",
  REMOVE: "REMOVE",
} as const;

type NotificationEventType =
  (typeof NotificationEventTypes)[keyof typeof NotificationEventTypes];

type EventPayload = string | INotification;

type EventCreator<T extends NotificationEventType> = (...args: never[]) => {
  type: T;
  payload?: EventPayload;
};

const notificationEventCreators = {
  [NotificationEventTypes.ADD]: (notification: INotification) => ({
    payload: notification,
    type: NotificationEventTypes.ADD,
  }),
  [NotificationEventTypes.REMOVE]: (id: string) => ({
    payload: id,
    type: NotificationEventTypes.REMOVE,
  }),
} satisfies {
  [eventType in NotificationEventType]: EventCreator<eventType>;
};

export type Event<T extends NotificationEventType> =
  (typeof notificationEventCreators)[T] extends (...args: never[]) => {
    type: T;
    payload?: infer Payload;
  }
    ? {
        type: T;
        payload?: Payload;
      }
    : never;

type NotificationEventCallback = (
  notificationEvent: Event<NotificationEventType>,
) => void;

type NotificationContext = {
  subscribeToNotificationEvents: (
    cb: NotificationEventCallback,
  ) => Subscription;
  dispatchNotification: (notification: Omit<INotification, "id">) => void;
};

const NotificationContext = createContext<NotificationContext | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const notificationSubject = new Subject<Event<NotificationEventType>>();
  function subscribeToNotificationEvents(
    notificationHandler: (
      notificationEvent: Event<NotificationEventType>,
    ) => void,
  ) {
    return notificationSubject.subscribe(notificationHandler);
  }
  function dispatchNotification(notification: Omit<INotification, "id">) {
    const id = v4();
    const notificationWithId: INotification = {
      id,
      durationMs: 5000,
      type: NotificationTypes.INFO,
      ...notification,
    };
    notificationSubject.next(notificationEventCreators.ADD(notificationWithId));
    setTimeout(
      () => notificationSubject.next(notificationEventCreators.REMOVE(id)),
      notification.durationMs ?? 5000,
    );
  }
  const notificationContext: NotificationContext = {
    subscribeToNotificationEvents,
    dispatchNotification,
  };
  return (
    <NotificationContext.Provider value={notificationContext}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationsContext() {
  return useContext(NotificationContext);
}
