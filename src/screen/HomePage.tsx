import React from 'react';
import {StyleSheet, View} from 'react-native';

import BookList from '../components/BookList';
import ButtonGroup from '../components/ButtonGroup';
import Header from '../components/Header';
import useNewBooks from '../api/useNewBooks';

const HomePage: React.FC = () => {
  const {data} = useNewBooks();

  return (
    <View style={styles.container}>
      <Header>
        <ButtonGroup />
      </Header>
      <BookList data={data?.books} />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
});
