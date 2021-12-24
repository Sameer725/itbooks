import React from 'react';

type StatusType = 'idle' | 'pending' | 'rejected' | 'resolved';

interface ResponseType<T> {
  status: StatusType;
  data: null | T;
  error: null | Error;
}

const defaultState: ResponseType<null> = {
  data: null,
  error: null,
  status: 'idle',
};

function useSafeDispatch(dispatch: any) {
  const mounted = React.useRef(false);
  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return React.useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch],
  );
}

export default function useAsync<T>(initialState = defaultState) {
  const initialStateRef = React.useRef({...defaultState, ...initialState});

  const [{status, data, error}, dispatch] = React.useReducer<
    (s: ResponseType<T>, a: any) => ResponseType<T>
  >((s, a) => ({...s, ...a}), initialStateRef.current);

  const safeDispatch = useSafeDispatch(dispatch);

  const run = React.useCallback(
    (
      promise:
        | Promise<ResponseType<T>['data'] | ResponseType<T>['error']>
        | undefined
        | null,
    ) => {
      if (!promise || !promise.then) {
        throw new Error(
          "The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?",
        );
      }
      safeDispatch({status: 'pending'});

      return promise.then(
        res => {
          safeDispatch({data: res, status: 'resolved'});
          return res;
        },
        err => {
          safeDispatch({err, status: 'rejected'});
          return Promise.reject(err);
        },
      );
    },
    [safeDispatch],
  );

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    error,
    data,
    run,
  };
}
