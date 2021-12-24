import {useRef} from 'react';
import {Book} from '../types';
import useClient from '../utils/useClient';

export default function useSearchBooks(query: string, page: number) {
  const books = useRef<Book[]>([]);
  const searchString = useRef<string>('');

  const {data: res, ...rest} = useClient<{books: Book[]}>(
    `search/${query}?page=${page}`,
  );
  const response = res?.books || [];

  if (searchString.current === query) {
    books.current = [...books.current, ...response];
  } else {
    books.current = response;
  }

  searchString.current = query;

  return {data: {books: books.current}, ...rest};
}
