import {useState, useEffect, Fragment} from 'react';

import styles from './Orders.module.css';
import Navigation from '../../components/Navigation/Navigation'
import axios from 'axios';

import tokenChecker from '../../components/utils/tokenChecker';

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if(!tokenChecker()){
      return props.history.push('/auth/login');
    }
    axios.get(`http://localhost:5000/bambora-shop/users/${localStorage.getItem('userId')}`).then(response => {
    setOrders({...response.data.orders})
    }).catch(err => console.log(err))
  }, [props])
  return <Fragment>
  <Navigation/>
    {orders.length === 0 ? <h1>No Orders Yet!</h1> : orders.map(item => item)}
  </Fragment>;
};

export default Orders;
