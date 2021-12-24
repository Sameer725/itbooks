import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import useBook from '../api/useBook';
import Header from '../components/Header';

import {COLORS, STYLES} from '../const';
import {Book} from '../types';
import {useSetHeader} from '../utils/useSetHeader';

function DetailPageHeader() {
  return <Header />;
}

const BookDetail: React.FC<{book: Book | null}> = ({book}) => {
  return (
    <View style={[styles.detailContainer]}>
      <View style={styles.imageContainer}>
        <Image style={[STYLES.image]} source={{uri: book?.image}} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={[STYLES.text, {color: COLORS.blueText}]}>
          {book?.title}
        </Text>
        <TouchableOpacity>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Buy</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TableRow: React.FC<{index: number}> = ({index, children}) => {
  const backgroundColor = index % 2 === 0 ? COLORS.white : COLORS.blackLight;

  return <View style={[{backgroundColor}, styles.row]}>{children}</View>;
};

const UpperCaseArray = ['isbn13', 'isbn10'];
const TextTransform = (key: string): TextStyle.TextTransform =>
  UpperCaseArray.includes(key) ? 'uppercase' : 'capitalize';

const BookDescription: React.FC<{detail: Book | null}> = ({detail}) => {
  const {pdf, title, subtitle, url, error, desc, image, ...rest} = detail || {};
  const tableData = Object.entries(rest || {});

  return (
    <ScrollView>
      {tableData.reverse().map((item, index) => {
        const textTransform = TextTransform(item[0]);

        return (
          <TableRow index={index}>
            <Text
              style={[
                styles.rowTitle,
                {textTransform, color: COLORS.blueText},
              ]}>
              {item[0]}
            </Text>
            <Text style={[styles.rowTitle]}>{item[1]}</Text>
          </TableRow>
        );
      })}
      <View style={styles.descriptionContainer}>
        <Text>{desc}</Text>
      </View>
    </ScrollView>
  );
};

export const DetailPage = () => {
  useSetHeader(DetailPageHeader);
  const {params} = useRoute() as {params: {book: Book}};
  const {title, subtitle, description, image, url, ...rest} = params?.book;
  const {data} = useBook(rest.isbn13);

  return (
    <View style={STYLES.container}>
      <BookDetail book={data} />
      <BookDescription detail={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    paddingTop: 20,
    backgroundColor: COLORS.blackLight,
  },

  imageContainer: {maxHeight: 250},

  row: {
    maxHeight: '15%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },

  rowTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  descriptionContainer: {
    padding: '5%',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  buttonContainer: {
    marginVertical: 15,
    paddingVertical: 15,
    paddingHorizontal: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.redPrimary,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
  },
});
