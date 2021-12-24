import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {IMAGES} from '../const';

import Icon from './Icon';

interface SearchInputProps {
  onChangeText?(text: string): void;
  value?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({onChangeText, value}) => {
  return (
    <View style={styles.searchInput}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Books By Title"
          onChangeText={onChangeText}
          value={value}
          autoFocus
        />
        <Icon uri={IMAGES.search} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    flex: 0.7,
    marginLeft: 15,
  },
  inputContainer: {
    flexDirection: 'row',
  },

  input: {
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    flex: 1,
  },
});

export default SearchInput;
