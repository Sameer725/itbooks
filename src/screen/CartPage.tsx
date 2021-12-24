import React from 'react';
import {Text, View} from 'react-native';
import Header from '../components/Header';

import {STYLES} from '../const';
import {useSetHeader} from '../utils/useSetHeader';

function CartPageHeader() {
  return <Header />;
}

export const CartPage = () => {
  useSetHeader(CartPageHeader);

  return (
    <View style={STYLES.container}>
      <Text>Cart</Text>
    </View>
  );
};
