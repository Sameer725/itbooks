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
  setCarts(item: CartType[]): void;
  addItem(item: CartType): void;
  removeItem(item: CartType): void;
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

  const setCarts = useCallback((c: CartType[]) => {
    setCartState(c);
  }, []);

  const addItem = useCallback((cart: CartType) => {
    setCartState(state => [...state, cart]);
  }, []);

  const removeItem = useCallback((cart: CartType) => {
    setCartState(state => state.filter(item => item.isbn13 !== cart.isbn13));
  }, []);

  const value = useMemo(() => {
    return {carts, setCarts, addItem, removeItem};
  }, [carts, setCarts, addItem, removeItem]);

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
  const {carts, setCarts} = useCarts();

  useEffect(() => {
    getCarts().then(c => c && setCarts(c));
  }, [setCarts]);

  useEffect(() => {
    storeCarts(carts);
  }, [carts]);

  return null;
};
