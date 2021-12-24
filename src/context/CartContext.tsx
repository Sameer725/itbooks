import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Book} from '../types';

type CartType = Pick<Book, 'image' | 'title' | 'isbn13' | 'price'>;

interface CartContextInterface {
  carts: CartType[];
  initializeCarts(carts: CartType[]): void;
  setCarts(item: CartType): void;
}

const storeCarts = async (carts: CartType[]) => {
  const data = JSON.stringify(carts);

  try {
    await AsyncStorage.setItem('carts', data);
  } catch (e) {
    // saving error
  }
};

const getCarts = async () => {
  try {
    const value = await AsyncStorage.getItem('carts');
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
  }
};

const CartContext = React.createContext<CartContextInterface | null>(null);

export const CartProvider: React.FC = ({children}) => {
  const [carts, setCartState] = useState<CartType[]>([]);

  const initializeCarts = useCallback((c: CartType[]) => {
    setCartState(c);
  }, []);

  const setCarts = useCallback((cart: CartType) => {
    setCartState(state => [...state, cart]);
  }, []);

  const value = useMemo(() => {
    return {carts, setCarts, initializeCarts: initializeCarts};
  }, [carts, setCarts, initializeCarts]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCarts = () => {
  const carts = useContext(CartContext);

  if (carts === null) {
    throw new Error('useCarts inside Provider');
  }

  return carts;
};

export const StoreCartComponent = () => {
  const {carts, initializeCarts} = useCarts();

  useEffect(() => {
    getCarts().then(c => c && initializeCarts(c));
  }, [initializeCarts]);

  useEffect(() => {
    carts.length && storeCarts(carts);
  }, [carts]);

  return null;
};
