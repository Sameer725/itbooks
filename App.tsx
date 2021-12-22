/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';

import {Button, SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import useNewBooks from './src/api/useNewBooks';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [, setCounter] = useState(0);
  useNewBooks();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const fun = () => {
    return setCounter(s => s + 1);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Button title="ADD" onPress={fun} />
    </SafeAreaView>
  );
};

export default App;
