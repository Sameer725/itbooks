import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../components/Header';

import {COLORS, STYLES} from '../const';
import {useCarts} from '../context/CartContext';
import {useSetHeader} from '../utils/useSetHeader';

const TableRow: React.FC<{index: number; style?: ViewStyle}> = ({
  index,
  children,
  style,
}) => {
  const backgroundColor = index % 2 === 0 ? COLORS.white : COLORS.blackLight;

  return <View style={[{backgroundColor}, styles.row, style]}>{children}</View>;
};

const Column: React.FC = ({children}) => {
  return <View style={styles.column}>{children}</View>;
};
export const CartPage = () => {
  const {carts, removeItem} = useCarts();

  const CartPageHeader = useCallback(() => {
    return (
      <Header>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{carts.length} item in cart</Text>
        </View>
      </Header>
    );
  }, [carts.length]);

  useSetHeader(CartPageHeader);

  return (
    <View style={STYLES.container}>
      {carts.length ? (
        <>
          <TableRow index={0} style={{backgroundColor: COLORS.redLight}}>
            <Column>
              <Text style={[STYLES.text, styles.headerText]}>Image</Text>
            </Column>
            <Column>
              <Text style={[STYLES.text, styles.headerText]}>Title</Text>
            </Column>
            <Column>
              <Text style={[STYLES.text, styles.headerText]}>Price</Text>
            </Column>
          </TableRow>
          <ScrollView>
            {carts.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item.isbn13}
                  onPress={() => removeItem(item)}>
                  <TableRow index={index}>
                    <Column>
                      <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={{uri: item.image}}
                      />
                    </Column>
                    <Column>
                      <Text>{item.title}</Text>
                    </Column>
                    <Column>
                      <Text>{item.price}</Text>
                    </Column>
                  </TableRow>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </>
      ) : (
        <View
          style={[
            STYLES.container,
            styles.messageContainer,
            styles.addMsgContainer,
          ]}>
          <Text style={[STYLES.text, styles.addMsg]}>Add Item To Cart</Text>
        </View>
      )}
    </View>
  );
};

const SIZE = 60;

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  message: {
    color: COLORS.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column: {
    borderRightWidth: 1,
    borderRightColor: COLORS.blackLight,
    alignItems: 'center',
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    color: COLORS.blueText,
  },
  image: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
  },
  addMsgContainer: {
    alignItems: 'center',
  },
  addMsg: {
    color: COLORS.blueText,
    fontSize: 20,
  },
});
