import {useState, useEffect, Fragment} from 'react';

import Navigation from '../../components/Navigation/Navigation';
import sharedStyles from '../shared/styles.module.css';
import tokenChecker from '../../components/utils/tokenChecker';
import axios from 'axios';

const Cart = (props) => {
  const [cart, setCart] = useState([]);
  const [hasItems, setHasItems] = useState(true);
  
  useEffect(() => {
    if(!tokenChecker()){
      return props.history.replace('/auth/login')
    }
    axios.get(`http://localhost:5000/bambora-shop/users/cart/${localStorage.getItem('userId')}`).then(response => {
      if(response.data){
        setCart(response.data.cart);
        setHasItems(response.data.cart.length > 0)
      }
    }).catch(err => console.log(err))
  }, [props])
  //will change the item show later
  return <Fragment>
  <Navigation/>
  {cart.length === 0 && !hasItems ? <h1 className={sharedStyles.emptyValueTitleStyle}>Nothing in your cart!</h1>: cart.map(item => item)}
  </Fragment>;
};

export default Cart;
