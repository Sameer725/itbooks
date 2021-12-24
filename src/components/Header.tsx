import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {COLORS, IMAGES, STYLES} from '../const';
import Icon from './Icon';

const Header: React.FC<{hideBack?: boolean}> = ({children, hideBack}) => {
  const {goBack} = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        {!hideBack && (
          <TouchableOpacity onPress={goBack}>
            <Icon uri={IMAGES.back} style={styles.backButton} />
          </TouchableOpacity>
        )}
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
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    backgroundColor: 'transparent',
    padding: 10,
  },
});

export default Header;
