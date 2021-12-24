import React from 'react';
import {Text, View} from 'react-native';
import Header from '../components/Header';

import {STYLES} from '../const';
import {useSetHeader} from '../utils/useSetHeader';

function DetailPageHeader() {
  return <Header />;
}

export const DetailPage = () => {
  useSetHeader(DetailPageHeader);

  return (
    <View style={STYLES.container}>
      <Text>Detail</Text>
    </View>
  );
};
