import { useEffect, useState } from "react";

interface ApiResponseBase<T> {
  isInProgress: boolean;
  isError: boolean;
  error?: unknown;
  result?: T;
}

interface PendingApiResponse<T> extends ApiResponseBase<T> {
  isInProgress: true;
  isError: false;
  error: undefined;
  result: undefined;
}

interface SuccessfulApiResponse<T> extends ApiResponseBase<T> {
  isInProgress: false;
  isError: false;
  error: undefined;
  result: T;
}

interface FailedApiResponse<T> extends ApiResponseBase<T> {
  isInProgress: false;
  isError: true;
  error: unknown;
  result: undefined;
}

export type ApiResponse<T> = PendingApiResponse<T> | SuccessfulApiResponse<T> | FailedApiResponse<T>;

function isApiResponseBase(arg: any): arg is ApiResponseBase<unknown> {
  const keys = Object.keys(arg || {});
  return keys.includes('isInProgress') && keys.includes('isError') && keys.includes('error') && keys.includes('result');
}

type UnboxApiResponse<F extends any[]> = {
  [P in keyof F]: F[P] extends ApiResponseBase<any> ? NonNullable<F[P]['result']> : F[P];
}

function unboxApiResponse<T>(arg: ApiResponse<T> | T): T {
  if (isApiResponseBase(arg)) {
    if (!arg.isInProgress && !arg.isError) {
      return arg.result;
    } else {
      throw new Error('API response was not finished loading.');
    }
  } else {
    return arg;
  }
}

export function useLoadData<T, Deps extends any[]>(
  fetchData: (...args: readonly [...UnboxApiResponse<Deps>]) => Promise<T>,
  data?: T,
  onDataLoaded?: (data: T) => void,
  fetchDataArgs?: readonly [...Deps],
  fetchWhenDepsChange = false
) {
  const [pendingData, setPendingData] = useState<ApiResponse<T>>(
    data
      ? {
        isInProgress: false,
        isError: false,
        error: undefined,
        result: data
      } : {
        isInProgress: true,
        isError: false,
        error: undefined,
        result: undefined
      }
  );

  useEffect(() => {
    if (data) onDataLoaded?.(data);
  }, []);

  useEffect(() => {
    async function loadData() {
      setPendingData({
        isInProgress: true,
        isError: false,
        error: undefined,
        result: undefined
      });

      try {
        const unboxedArgs = fetchDataArgs?.map(unboxApiResponse);
        const fetchedData = await fetchData(...((unboxedArgs || []) as Parameters<typeof fetchData>));

        setPendingData({
          isInProgress: false,
          isError: false,
          error: undefined,
          result: fetchedData
        });

        onDataLoaded?.(fetchedData);
      } catch (error: unknown) {
        setPendingData({
          isInProgress: false,
          isError: true,
          error: error,
          result: undefined
        });
      }
    }

    const argsAreLoaded = (fetchDataArgs || []).map((arg: unknown) => {
      if (isApiResponseBase(arg)) {
        return !(arg.isInProgress || arg.isError);
      }
      return true;
    }).reduce((prev, curr) => prev && curr, true);

    const argsHaveErrors = (fetchDataArgs || []).map((arg: unknown) => {
      if (isApiResponseBase(arg)) {
        return arg.isError;
      }
      return false;
    }).reduce((prev, curr) => prev && curr, false);

    if (argsHaveErrors) {
      setPendingData({
        isInProgress: false,
        isError: true,
        error: undefined,
        result: undefined
      });
    } else if ((!pendingData.result || fetchWhenDepsChange) && argsAreLoaded) {
      loadData();
    }

  }, fetchDataArgs || []);

  return pendingData;
}
