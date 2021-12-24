import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, IMAGES} from '../const';
import {useCarts} from '../context/CartContext';

import Icon from './Icon';

interface ButtonGroupProps {
  onSearchPress?(): void;
  onCartPress?(): void;
}

const ButtonGroup = ({onCartPress, onSearchPress}: ButtonGroupProps) => {
  const {carts} = useCarts();

  return (
    <View style={styles.container}>
      <Icon onPress={onSearchPress} style={styles.icon} uri={IMAGES.search} />

      <Icon
        onPress={onCartPress}
        style={styles.icon}
        uri={IMAGES.cart}
        badgeValue={carts.length ? `${carts.length}` : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: COLORS.redLight,
  },
});

export default ButtonGroup;
