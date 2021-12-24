import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

export interface IconProps {
  onPress?(): void;
  uri: string;
  style?: ViewStyle;
}

const Icon: React.FC<IconProps> = ({onPress, children, uri, style}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View style={[styles.iconContainer, style]}>
        <Image source={{uri}} style={styles.icon} />
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default Icon;

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: '#b2395b',
    padding: 15,
  },
  icon: {
    height: 15,
    width: 15,
  },
});
