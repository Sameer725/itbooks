import React from 'react';

type StatusType = 'idle' | 'pending' | 'rejected' | 'resolved';

interface ResponseType {
  status: StatusType;
  data: null | any;
  error: null | Error;
}

const defaultState: ResponseType = {data: null, error: null, status: 'idle'};

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

export default function useAsync(initialState: ResponseType = defaultState) {
  const initialStateRef = React.useRef({...defaultState, ...initialState});

  const [{status, data, error}, dispatch] = React.useReducer<
    (s: ResponseType, a: any) => ResponseType
  >((s, a) => ({...s, ...a}), initialStateRef.current);

  const safeDispatch = useSafeDispatch(dispatch);

  const setData = React.useCallback(
    (res: ResponseType['data']) =>
      safeDispatch({data: res, status: 'resolved'}),
    [safeDispatch],
  );

  const setError = React.useCallback(
    (err: ResponseType['error']) => safeDispatch({err, status: 'rejected'}),
    [safeDispatch],
  );

  const run = React.useCallback(
    (
      promise:
        | Promise<ResponseType['data'] | ResponseType['error']>
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
          setData(res);
          return res;
        },
        err => {
          setError(err);
          return Promise.reject(err);
        },
      );
    },
    [safeDispatch, setData, setError],
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
