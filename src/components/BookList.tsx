import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {
  FlatListProps,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

//@ts-ignore
import Star from 'react-native-star-view';
import {COLORS, STYLES} from '../const';

import {Book} from '../types';
import Loader from './Loder';

const BookItem: React.FC<{book: Book; onPress?(): void}> = ({
  book,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
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
    </TouchableOpacity>
  );
};

interface BookListProps
  extends Omit<FlatListProps<Book>, 'renderItem' | 'keyExtractor'> {
  message?: string;
  isLoading?: boolean;
}

const BookList = ({data, message, isLoading, ...rest}: BookListProps) => {
  const {navigate} = useNavigation();

  const renderItem = useCallback(
    ({item}) => {
      return (
        <BookItem
          book={item}
          onPress={() => navigate('Detail', {book: item})}
        />
      );
    },
    [navigate],
  );

  const MemoizedRender = useMemo(() => renderItem, [renderItem]);

  return data?.length ? (
    <FlatList
      data={data}
      keyExtractor={(item, index) => `${item.isbn13}-${index}`}
      renderItem={MemoizedRender}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      {...rest}
    />
  ) : (
    <View style={[styles.messageContainer, STYLES.container]}>
      {isLoading ? (
        <Loader />
      ) : (
        <Text style={styles.message}>{message || 'No Data'}</Text>
      )}
    </View>
  );
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
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.blueBg,
  },
});
