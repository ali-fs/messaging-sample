import axios, { AxiosError, AxiosRequestConfig } from "axios";

const RestAPIHandler = {
  send: async <T>(request: AxiosRequestConfig): Promise<T> => {
    try {
      const res = await axios.request<T>(request);
      if (res.data) return res.data;
      throw errorHandler(res.data);
    } catch (e) {
      return errorHandler(e);
    }
  },
};

const errorHandler = (e: any) => {
  const error = e as AxiosError<any>;
  throw {
    errorCode: error.response?.status || 0,
    message: error.response?.data?.error || "FALLBACK_MESSAGE",
    originalMessage: error.message ?? "",
    status: error.status || 0,
    errorObject: error,
  };
};

export default RestAPIHandler;
