import {useEffect} from 'react';
import client from './apiClient';
import useAsync from './useAsync';

export default function useClient(endpoint: string) {
  const {run, ...rest} = useAsync();

  useEffect(() => {
    run(client({endpoint}));
  }, [run, endpoint]);

  return rest;
}
