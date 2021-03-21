import {useState, useEffect, Fragment} from 'react';

import Navigation from '../../components/Navigation/Navigation';
import Loader from 'react-loader-spinner';
import sharedStyles from '../shared/styles.module.css';
import tokenChecker from '../../components/utils/tokenChecker';
import axios from 'axios';

const Cart = (props) => {
  const [cart, setCart] = useState([]);
  const [hasItems, setHasItems] = useState(true);
  const [loading, setLoading]= useState(false);
  
  useEffect(() => {

    if(!tokenChecker()){
      return props.history.replace('/auth/login')
    }
    setLoading(true);
    axios.get(`http://localhost:5000/bambora-shop/users/cart/${localStorage.getItem('userId')}`).then(response => {
      if(response.data){

        setCart(response.data.cart);
        setHasItems(response.data.cart.length > 0)
        setLoading(false);

      }
    }).catch(err => {
      console.log(err);
      setLoading(false)
    })

  }, [props]);
  
  //will change the item show later
  return <Fragment>
  <Navigation/>
  {loading && <div className={sharedStyles.loadingSection}>
    <Loader type="Circles" height={80} width={80} color="black"/>
  </div>}
  {cart.length === 0 && !hasItems ? <h1 className={sharedStyles.emptyValueTitleStyle}>Nothing in your cart!</h1>: cart.map(item => item)}
  </Fragment>;
};

export default Cart;
