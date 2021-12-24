import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackHeaderProps} from '@react-navigation/stack';

export function useSetHeader(
  header: (props: StackHeaderProps) => React.ReactNode,
) {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({header});
  }, [setOptions, header]);
}
