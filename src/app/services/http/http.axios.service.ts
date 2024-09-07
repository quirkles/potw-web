import { getToken } from "@firebase/app-check";
import axios, { Axios, AxiosError } from "axios";
import { v4 } from "uuid";
import { ZodError, ZodSchema, ZodType } from "zod";

import { getConfig } from "@/config";
import { getFirebaseAppCheck } from "@/firebase";

import {
  HttpService,
  HttpServiceMethods,
  Interceptor,
} from "@/app/services/http/http.service";

import { ILogger } from "@/utils/logger";

export class HttpAxiosService implements HttpService {
  private delay = getConfig().env === "local" ? 1500 : 0;
  private interceptors: (Interceptor<"get" | "put" | "post" | "delete"> & {
    id: string;
  })[] = [];

  private readonly axiosInstance: Axios;

  constructor(private readonly logger: ILogger) {
    this.axiosInstance = axios.create();
  }

  async get<T>(params: {
    url: string;
    headers?: Record<string, string> | undefined;
    responseSchema: ZodSchema<T>;
    useAppCheck?: boolean;
  }): Promise<T> {
    try {
      let {
        responseSchema,
        useAppCheck = false,
        ...transformedParams
      } = params;

      for (const interceptor of this.interceptors) {
        if (interceptor.method === "get" && interceptor.requestInterceptor) {
          transformedParams = interceptor.requestInterceptor(transformedParams);
        }
      }

      const { url, headers = {} } = transformedParams;

      const token = localStorage?.getItem("token") || null;
      if (!token) {
        headers["authorization"] = `Bearer ${token}`;
      }

      if (useAppCheck) {
        try {
          const appCheckTokenResponse = await getToken(
            getFirebaseAppCheck(),
            /* forceRefresh= */ false,
          );
          headers["X-Firebase-AppCheck"] = appCheckTokenResponse.token;
        } catch (err) {
          // Handle any errors if the token was not retrieved.
          this.logger.error({
            message: "app check token error",
            error: err as Error,
          });
        }
      }

      await new Promise((resolve) => setTimeout(resolve, this.delay));

      let response = await this.axiosInstance.get(url, { headers });
      let transformedResponse = response.data;
      for (const interceptor of this.interceptors) {
        if (interceptor.method === "get" && interceptor.responseInterceptor) {
          transformedResponse =
            interceptor.responseInterceptor(transformedResponse);
        }
      }
      return responseSchema.parse(transformedResponse);
    } catch (error) {
      this.handleError(error as ZodError | AxiosError | Error);
    }
  }

  async post<T>(params: {
    url: string;
    headers?: Record<string, string> | undefined;
    body: any;
    responseSchema: ZodType<T>;
    useAppCheck?: boolean;
  }): Promise<T> {
    try {
      let { responseSchema, body, useAppCheck, ...transformedParams } = params;

      for (const interceptor of this.interceptors) {
        if (interceptor.method === "post" && interceptor.requestInterceptor) {
          transformedParams = interceptor.requestInterceptor(transformedParams);
        }
      }

      const { url, headers = {} } = transformedParams;

      const token = localStorage?.getItem("token") || null;
      if (token) {
        headers["authorization"] = `Bearer ${token}`;
      }

      if (useAppCheck) {
        try {
          const appCheckTokenResponse = await getToken(
            getFirebaseAppCheck(),
            /* forceRefresh= */ false,
          );
          headers["X-Firebase-AppCheck"] = appCheckTokenResponse.token;
        } catch (err) {
          // Handle any errors if the token was not retrieved.
          this.logger.error({
            message: "app check token error",
            error: err as Error,
          });
        }
      }

      await new Promise((resolve) => setTimeout(resolve, this.delay));

      let response = await this.axiosInstance.post(url, body, { headers });

      let transformedResponse = response.data;

      for (const interceptor of this.interceptors) {
        if (interceptor.method === "post" && interceptor.responseInterceptor) {
          transformedResponse =
            interceptor.responseInterceptor(transformedResponse);
        }
      }

      return responseSchema.parse(transformedResponse);
    } catch (error) {
      this.handleError(error as ZodError | AxiosError | Error);
    }
  }

  async put<T>(params: {
    url: string;
    headers?: Record<string, string> | undefined;
    body: any;
    responseSchema: ZodType<T>;
    useAppCheck?: boolean;
  }): Promise<T> {
    try {
      let { responseSchema, body, useAppCheck, ...transformedParams } = params;

      for (const interceptor of this.interceptors) {
        if (interceptor.method === "put" && interceptor.requestInterceptor) {
          transformedParams = interceptor.requestInterceptor(transformedParams);
        }
      }

      const { url, headers = {} } = transformedParams;

      await new Promise((resolve) => setTimeout(resolve, this.delay));

      let response = await this.axiosInstance.put(url, body, { headers });

      let transformedResponse = response.data;

      const token = localStorage?.getItem("token") || null;
      if (!token) {
        headers["authorization"] = `Bearer ${token}`;
      }

      if (useAppCheck) {
        try {
          const appCheckTokenResponse = await getToken(
            getFirebaseAppCheck(),
            /* forceRefresh= */ false,
          );
          headers["X-Firebase-AppCheck"] = appCheckTokenResponse.token;
        } catch (err) {
          // Handle any errors if the token was not retrieved.
          this.logger.error({
            message: "app check token error",
            error: err as Error,
          });
        }
      }

      for (const interceptor of this.interceptors) {
        if (interceptor.method === "put" && interceptor.responseInterceptor) {
          transformedResponse =
            interceptor.responseInterceptor(transformedResponse);
        }
      }
      return responseSchema.parse(transformedResponse);
    } catch (error) {
      this.handleError(error as ZodError | AxiosError | Error);
    }
  }

  async delete<T>(params: {
    url: string;
    headers?: Record<string, string> | undefined;
    responseSchema: ZodType<T>;
    useAppCheck?: boolean;
  }): Promise<T> {
    try {
      let { responseSchema, useAppCheck, ...transformedParams } = params;

      for (const interceptor of this.interceptors) {
        if (interceptor.method === "delete" && interceptor.requestInterceptor) {
          transformedParams = interceptor.requestInterceptor(transformedParams);
        }
      }

      const { url, headers = {} } = transformedParams;

      await new Promise((resolve) => setTimeout(resolve, this.delay));

      let response = await this.axiosInstance.delete(url, { headers });

      let transformedResponse = response.data;

      const token = localStorage?.getItem("token") || null;
      if (!token) {
        headers["authorization"] = `Bearer ${token}`;
      }

      if (useAppCheck) {
        try {
          const appCheckTokenResponse = await getToken(
            getFirebaseAppCheck(),
            /* forceRefresh= */ false,
          );
          headers["X-Firebase-AppCheck"] = appCheckTokenResponse.token;
        } catch (err) {
          // Handle any errors if the token was not retrieved.
          this.logger.error({
            message: "app check token error",
            error: err as Error,
          });
        }
      }

      for (const interceptor of this.interceptors) {
        if (
          interceptor.method === "delete" &&
          interceptor.responseInterceptor
        ) {
          transformedResponse =
            interceptor.responseInterceptor(transformedResponse);
        }
      }
      return responseSchema.parse(transformedResponse);
    } catch (error) {
      this.handleError(error as ZodError | AxiosError | Error);
    }
  }

  addInterceptor<T extends keyof HttpServiceMethods>(
    interceptor: Interceptor<T>,
  ): () => void {
    const interceptorId = v4();
    this.interceptors.push({
      id: interceptorId,
      ...interceptor,
    } as Interceptor<keyof HttpServiceMethods> & { id: string });
    return () => {
      this.interceptors = this.interceptors.filter(
        (i) => i.id !== interceptorId,
      );
    };
  }

  private handleError(error: ZodError | AxiosError | Error): never {
    if (error instanceof ZodError) {
      this.logger.warn({
        message: "http service validation error",
        error: error,
        payload: {
          formattedError: error.format(),
        },
      });
    } else if (error instanceof AxiosError) {
      this.logger.warn({
        message: "http service request error",
        error: error,
        payload: {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        },
      });
    } else {
      this.logger.warn({
        message: "http service unknown error",
        error: error,
      });
    }
    throw new Error("http service error: " + error.message);
  }
}
