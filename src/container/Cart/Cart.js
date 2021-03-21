import {useState, useEffect} from 'react';

import styles from './Cart.module.css';
import tokenChecker from '../../components/utils/tokenChecker';

const Cart = (props) => {
  useEffect(() => {
    if(!tokenChecker()){
      return props.history.replace('/auth/login')
    }
  }, [])
  return <h1>This is the cart</h1>;
};

export default Cart;
