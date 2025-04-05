import { TRequestError } from "../@types";
import { useCallback, useEffect, useState } from "react";

interface HookReturnType<T extends (...args: any) => any> {
  refresh: () => ReturnType<T>;
  loading: boolean;
  error: TRequestError | undefined;
  result: Awaited<ReturnType<T>> | undefined;
}
type TParams<T extends (...args: any) => any> =
  Parameters<T>[0] extends undefined ? [] : [Parameters<T>[0]];

const useRequest = <T extends (...args: any) => any>(
  APIFn: T,
  ...params: TParams<T>
): HookReturnType<T> => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<TRequestError | undefined>(undefined);
  const [result, setResult] = useState<Awaited<ReturnType<T>>>();

  const refresh: any = useCallback(async () => {
    setLoading(true);
    setResult(undefined);
    setError(undefined);
    try {
      const response = await APIFn(params[0]);
      setResult(response);
      return response;
    } catch (e) {
      setError(e as TRequestError);
    } finally {
      setLoading(false);
    }
  }, [APIFn, JSON.stringify(params)]);

  useEffect(() => {
    refresh(params);
  }, [JSON.stringify(params)]);

  return { result, loading, error, refresh };
};

export default useRequest;
