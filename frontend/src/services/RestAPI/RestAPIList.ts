import { AxiosRequestConfig } from "axios";
import RestAPIHandler from "./RestAPIHandler";
import { TGroup, TLoginRes, TMessage } from "../../@types";

export const loginUser = async (username: string, password: string) => {
  const config: AxiosRequestConfig = {
    url: "/login",
    method: "post",
    data: { username, password },
  };
  return await RestAPIHandler.send<TLoginRes>(config);
};

export const getGroupList = async () => {
  const config: AxiosRequestConfig = {
    url: "/groups",
    method: "get",
  };
  return await RestAPIHandler.send<TGroup[]>(config);
};

export const getGroupMessages = async (groupId: string) => {
  const config: AxiosRequestConfig = {
    url: `/groups/${groupId}`,
    method: "get",
  };
  return await RestAPIHandler.send<TMessage[]>(config);
};
