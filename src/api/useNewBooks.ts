import useClient from '../utils/useClient';

export default function useNewBooks() {
  return useClient('/new');
}
