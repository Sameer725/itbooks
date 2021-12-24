import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../const/colors';
import {IMAGES} from '../const/images';

import Icon from './Icon';

const ButtonGroup = () => {
  return (
    <View style={styles.container}>
      <Icon style={styles.icon} uri={IMAGES.search} />

      <Icon style={styles.icon} uri={IMAGES.cart} />
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
