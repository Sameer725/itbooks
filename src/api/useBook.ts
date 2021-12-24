import {Book} from '../types';
import useClient from '../utils/useClient';

export default function useBook(id: string) {
  return useClient<Book>(`books/${id}`);
}
