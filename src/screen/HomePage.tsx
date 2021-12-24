import React from 'react';
import {View} from 'react-native';
import {StackHeaderProps} from '@react-navigation/stack';

import BookList from '../components/BookList';

import useNewBooks from '../api/useNewBooks';
import {useSetHeader} from '../utils/useSetHeader';
import Header from '../components/Header';
import ButtonGroup from '../components/ButtonGroup';
import {STYLES} from '../const';

function HomePageHeader({navigation}: StackHeaderProps) {
  return (
    <Header>
      <ButtonGroup
        onCartPress={() => navigation.navigate('Cart')}
        onSearchPress={() => navigation.navigate('Search')}
      />
    </Header>
  );
}

export const HomePage: React.FC = () => {
  const {data} = useNewBooks();
  useSetHeader(HomePageHeader);

  return (
    <View style={STYLES.container}>
      <BookList data={data?.books} />
    </View>
  );
};
