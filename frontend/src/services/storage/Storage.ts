import { EStorageKeys, TStorageMap } from "../../@types";

export const setToStorage = <T extends EStorageKeys>(
  key: T,
  value: TStorageMap[T]
) => {
  const correctValue =
    typeof value === "string" ? value : JSON.stringify(value);
  window.localStorage.setItem(key, correctValue);
};

export const getFromStorage = <T extends EStorageKeys>(
  key: T,
  defaultValue?: TStorageMap[T]
): TStorageMap[T] | undefined => {
  const value = window.localStorage.getItem(key);
  if (!value) return defaultValue;
  try {
    return JSON.parse(value);
  } catch (e: any) {
    return value as TStorageMap[T];
  }
};

export const removeFromStorage = <T extends EStorageKeys>(key: T) => {
  window.localStorage.removeItem(key);
};
