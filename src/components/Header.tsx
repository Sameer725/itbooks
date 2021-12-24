import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import {COLORS, IMAGES, STYLES} from '../const';

const Header: React.FC = ({children}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          style={STYLES.image}
          source={{uri: IMAGES.logo}}
        />
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 15,
    backgroundColor: COLORS.blueBg,
    flexDirection: 'row',
    maxHeight: 70,
  },

  logoContainer: {
    flex: 0.3,
  },
});

export default Header;
