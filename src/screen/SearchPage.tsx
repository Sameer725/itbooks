import React from 'react';
import {Text, View} from 'react-native';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';

import {STYLES} from '../const';
import {useSetHeader} from '../utils/useSetHeader';

function SearchPageHeader({navigation}: StackHeaderProps) {
  return (
    <Header>
      <SearchInput />
    </Header>
  );
}

export const SearchPage = () => {
  useSetHeader(SearchPageHeader);

  return (
    <View style={STYLES.container}>
      <Text>Detail</Text>
    </View>
  );
};
