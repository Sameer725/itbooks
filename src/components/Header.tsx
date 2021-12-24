import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {COLORS} from '../const/colors';

const Header: React.FC = ({children}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{uri: 'https://itbook.store/img/logo.png'}}
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
  image: {
    height: '100%',
    width: '100%',
  },
});

export default Header;
