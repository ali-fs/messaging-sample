import { useCallback, useState } from "react";

interface HookReturnType<T extends (...args: any) => any> {
  call: Parameters<T>[0] extends undefined
    ? () => ReturnType<T>
    : (...args: Parameters<T>) => ReturnType<T>;
  result: Awaited<ReturnType<T>> | undefined;
  loading: boolean;
}

const useLazyRequest = <T extends (...args: any) => any>(
  APIFn: T
): HookReturnType<T> => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const call: any = useCallback(
    async (...params: any) => {
      setLoading(true);
      setResult(undefined);
      try {
        const response = await APIFn(...params);
        setResult(response);
        return response;
      } finally {
        setLoading(false);
      }
    },
    [APIFn]
  );

  return { call, result, loading };
};

export default useLazyRequest;
