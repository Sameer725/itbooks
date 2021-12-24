import {useEffect} from 'react';
import client from './apiClient';
import useAsync from './useAsync';

export default function useClient<T>(endpoint: string) {
  const {run, ...rest} = useAsync<T>();

  useEffect(() => {
    run(client({endpoint}));
  }, [run, endpoint]);

  return rest;
}
