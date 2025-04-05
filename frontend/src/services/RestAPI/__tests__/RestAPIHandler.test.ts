import { AxiosRequestConfig } from "axios";
import RestAPIHandler from "../RestAPIHandler";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockedAxios = new MockAdapter(axios);
const sampleAPI: AxiosRequestConfig = {
  url: "/test",
  method: "post",
  data: {},
};

describe("RestAPIHandler", () => {
  it("should return valid result for a successful api call", async () => {
    const successResponse = { success: true, data: { testData: "testData" } };
    mockedAxios.onPost().replyOnce(200, successResponse);
    const result = await RestAPIHandler.send(sampleAPI);
    expect(result).toEqual(successResponse);
  });

  it("should return valid result for server failed api call", async () => {
    const failedResponse = { error: "Access denied" };
    const error = {
      errorCode: 500,
      message: "Access denied",
      originalMessage: "Request failed with status code 500",
      status: 500,
      errorObject: {},
    };
    mockedAxios.onPost().replyOnce(500, failedResponse);
    try {
      await RestAPIHandler.send(sampleAPI);
    } catch (e: any) {
      expect(e.errorCode).toEqual(error.errorCode);
      expect(e.message).toEqual(error.message);
      expect(e.originalMessage).toEqual(error.originalMessage);
      expect(e.status).toEqual(error.status);
      expect(e.errorObject).toBeDefined();
    }
  });
});
