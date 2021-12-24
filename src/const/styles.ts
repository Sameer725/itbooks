import {StyleSheet} from 'react-native';
import {COLORS} from './colors';

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
