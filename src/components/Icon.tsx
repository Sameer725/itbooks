import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ViewStyle,
  Text,
} from 'react-native';
import {COLORS} from '../const';

export interface IconProps {
  onPress?(): void;
  uri: string;
  style?: ViewStyle;
  badgeValue?: string;
}

const Badge: React.FC<{value?: string}> = ({value}) => {
  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>{value}</Text>
    </View>
  );
};

const Icon: React.FC<IconProps> = ({onPress, uri, style, badgeValue}) => {
  const badge = Number(badgeValue) > 9 ? '9+' : badgeValue;
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View style={[styles.iconContainer, style]}>
        <Image source={{uri}} style={styles.icon} />
        {badgeValue && <Badge value={badge} />}
      </View>
    </TouchableOpacity>
  );
};

export default Icon;

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: '#b2395b',
    padding: 15,
    position: 'relative',
  },
  icon: {
    height: 15,
    width: 15,
  },
  badgeContainer: {
    position: 'absolute',
    right: -5,
    backgroundColor: COLORS.redPrimary,
    height: 20,
    width: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: COLORS.white,
  },
});
