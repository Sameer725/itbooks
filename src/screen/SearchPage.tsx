import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import useSearchBooks from '../api/useSearchBook';
import BookList from '../components/BookList';
import Header from '../components/Header';
import Loader from '../components/Loder';
import SearchInput from '../components/SearchInput';

import {STYLES} from '../const';
import {useSetHeader} from '../utils/useSetHeader';
let timer: NodeJS.Timeout;

export const SearchPage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const {data, isLoading} = useSearchBooks(search, page);

  const loadMore = useCallback(() => {
    setPage(p => p + 1);
  }, []);

  const delaySetState = useCallback((value: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => setSearch(value), 1000);
  }, []);

  const SearchPageHeader = useCallback(() => {
    return (
      <Header>
        <SearchInput onChangeText={delaySetState} />
      </Header>
    );
  }, [delaySetState]);

  useSetHeader(SearchPageHeader);

  return (
    <View style={STYLES.container}>
      <BookList
        data={data?.books}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        initialNumToRender={10}
        ListFooterComponent={Loader}
        message="Search Books"
        isLoading={isLoading}
      />
    </View>
  );
};
