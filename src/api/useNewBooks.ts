import {Book} from '../types';
import useClient from '../utils/useClient';

export default function useNewBooks() {
  return useClient<{books: Book[]}>('/new');
}
