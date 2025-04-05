export type TJSON =
  | string
  | number
  | boolean
  | null
  | { [x: string]: TJSON }
  | Array<TJSON>;

export type TKeysWithValsOfType<T, V> = keyof {
  [K in keyof T as T[K] extends V ? K : never]: K;
} &
  keyof T;

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type TRequestError = {
  errorCode: string;
  message: string;
  originalMessage: string;
  status: number;
  errorObject: any;
};

export type TGetSagaAction<ActionList, Type> = Extract<
  ActionList,
  { type: Type }
>;

export type TWithLoading<T> = T & { loading: boolean };

export type TUser = {
  id: string;
  name: string;
  username: string;
};

export type TGroup = {
  id: string;
  name: string;
};

export type TMessage = {
  id: string;
  userId: string;
  groupId: string;
  text: string;
  createdAt: number;
};

export type TLoginRes = {
  token: string;
  user: TUser;
};

export type TStorageMap = {
  user: TUser;
  token: string;
};

export type EStorageKeys = keyof TStorageMap;
