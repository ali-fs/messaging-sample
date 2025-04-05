import { getFromStorage, setToStorage } from "../Storage";

const testKey = "testKey" as any;
const testJson = {
  key1: "value1",
};
const testString = "test string";

describe("Storage", () => {
  describe("getFromStorage", () => {
    it("should return undefined if the key is not exist", async () => {
      const res = getFromStorage(testKey);
      expect(res).toBeUndefined();
    });

    it("should return default value if the key is not exist", async () => {
      const res = getFromStorage(testKey, "defaultValue");
      expect(res).toEqual("defaultValue");
    });

    it("should return correct string value", async () => {
      setToStorage(testKey, testString);
      const res = getFromStorage(testKey);
      expect(res).toEqual(testString);
    });

    it("should return parsed json value", async () => {
      setToStorage(testKey, testJson);
      const res = getFromStorage(testKey);
      expect(res).toEqual(testJson);
    });
  });

  describe("setToStorage", () => {
    it("should work fine with JSON values", async () => {
      setToStorage(testKey, testJson);
    });

    it("should work fine with string values", async () => {
      setToStorage(testKey, testString);
    });
  });
});
