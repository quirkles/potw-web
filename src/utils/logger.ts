import { v4 } from "uuid";

interface LogLabels {
  [key: string]: string;
}

interface LogPayload {
  [key: string]: unknown;
}

type LoggerArgs = {
  message?: string;
  labels?: LogLabels;
  payload?: LogPayload;
  error?: Error;
};

export interface ILogger {
  log: (params: LoggerArgs) => void;
  error: (params: LoggerArgs) => void;
  warn: (params: LoggerArgs) => void;
  addLabels: (labels: LogLabels) => void;
}

class Logger implements ILogger {
  constructor(private readonly labels: LogLabels = {}) {
    if (!("instanceId" in this.labels)) {
      this.labels.instanceId = v4();
    }
  }

  addLabels(labels: LogLabels) {
    Object.assign(this.labels, labels);
  }

  log({ message, labels = {}, payload = {}, error }: LoggerArgs) {
    console.log({
      message,
      labels: {
        ...labels,
        ...this.labels,
      },
      payload,
      error: {
        message: error?.message,
        stack: `${error?.stack}`,
      },
    });
  }

  error({ message, labels = {}, payload = {}, error }: LoggerArgs) {
    console.error({
      message,
      labels: {
        ...labels,
        ...this.labels,
      },
      payload,
      error: {
        message: error?.message,
        stack: `${error?.stack}`,
      },
    });
  }

  warn({ message, labels = {}, payload = {}, error }: LoggerArgs) {
    console.warn({
      message,
      labels: {
        ...labels,
        ...this.labels,
      },
      payload,
      error: {
        message: error?.message,
        stack: `${error?.stack}`,
      },
    });
  }
}

export const logger = new Logger();
