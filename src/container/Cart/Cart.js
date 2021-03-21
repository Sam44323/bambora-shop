import {useState, useEffect, Fragment} from 'react';

import Navigation from '../../components/Navigation/Navigation';
import styles from './Cart.module.css';
import tokenChecker from '../../components/utils/tokenChecker';

const Cart = (props) => {
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    if(!tokenChecker()){
      return props.history.replace('/auth/login')
    }
  }, [props])
  return <Fragment>
  <Navigation/>
  <h1>This is the cart</h1></Fragment>;
};

export default Cart;
