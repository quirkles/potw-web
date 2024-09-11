import { output, ZodSchema } from "zod";

import { HttpAxiosService } from "@/app/services/http/http.axios.service";

import { logger } from "@/utils/logger";

export interface HttpServiceMethods {
  get: <T extends ZodSchema<unknown>>(params: {
    url: string;
    headers?: Record<string, string>;
    responseSchema: T;
  }) => Promise<output<T>>;
  post: <T extends ZodSchema<unknown>>(params: {
    url: string;
    headers?: Record<string, string>;
    body: any;
    responseSchema: ZodSchema<T>;
  }) => Promise<output<T>>;
  put: <T extends ZodSchema<unknown>>(params: {
    url: string;
    headers?: Record<string, string>;
    body: any;
    responseSchema: T;
  }) => Promise<output<T>>;
  delete: <T extends ZodSchema<unknown>>(params: {
    url: string;
    headers?: Record<string, string>;
    responseSchema: ZodSchema<T>;
  }) => Promise<output<T>>;
}

export type Interceptor<T extends keyof HttpServiceMethods> = {
  method: T;
  // Modify the request parameters before request is sent
  requestInterceptor?: (
    params: T extends "get" | "delete"
      ? {
          url: string;
          headers?: Record<string, string>;
          useAppCheck?: boolean;
        }
      : {
          url: string;
          headers?: Record<string, string>;
          body?: any;
          useAppCheck?: boolean;
        },
  ) => T extends "get" | "delete"
    ? {
        url: string;
        headers?: Record<string, string>;
      }
    : {
        url: string;
        headers?: Record<string, string>;
        body?: any;
      };
  // perform some action with the response before it is returned
  responseInterceptor?: (response: unknown) => unknown;
};

type addInterceptor = <T extends keyof HttpServiceMethods>(
  interceptor: Interceptor<T>,
) => () => void;

export type HttpService = HttpServiceMethods & {
  addInterceptor: addInterceptor;
};

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly message: string,
  ) {
    super(message);
  }
}

export const httpService = new HttpAxiosService(logger);
