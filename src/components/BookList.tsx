import React from 'react';
import {
  FlatListProps,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
} from 'react-native';

//@ts-ignore
import Star from 'react-native-star-view';
import {COLORS} from '../const/colors';

import {Book} from '../types';

const BookItem: React.FC<{book: Book}> = ({book}) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: book.image}} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{book.title}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Star style={styles.star} score={Number(book.rating)} />
        <Text style={styles.price}>{book.price}</Text>
      </View>
    </View>
  );
};

interface BookListProps
  extends Omit<FlatListProps<Book>, 'renderItem' | 'keyExtractor'> {}

const BookList = ({data}: BookListProps) => {
  return data?.length ? (
    <FlatList
      data={data}
      keyExtractor={item => item.isbn13}
      renderItem={({item}) => <BookItem book={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    />
  ) : null;
};

export default BookList;

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 15,
    paddingBottom: 80,
  },

  itemContainer: {
    elevation: 5,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 50,
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    height: 200,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  textContainer: {
    margin: 15,
  },
  text: {
    color: COLORS.blueText,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '700',
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  price: {
    color: COLORS.redPrimary,
    fontSize: 15,
    fontWeight: 'bold',
  },

  star: {
    width: 100,
    height: 20,
  },
});
