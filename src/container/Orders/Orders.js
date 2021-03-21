import {useState, useEffect, Fragment} from 'react';

import sharedStyles from '../shared/styles.module.css';
import Loader from 'react-loader-spinner';
import Navigation from '../../components/Navigation/Navigation'
import axios from 'axios';

import tokenChecker from '../../components/utils/tokenChecker';

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!tokenChecker()){
      return props.history.push('/auth/login');
    }
    setLoading(true);

    axios.get(`http://localhost:5000/bambora-shop/users/${localStorage.getItem('userId')}`).then(response => {

    setOrders({...response.data.orders});
    setLoading(false);

    }).catch(err => {
      console.log(err);
      setLoading(false);
    })
  }, [props]);


  return <Fragment>
  <Navigation/>
  {loading && <div className={sharedStyles.loadingSection}>
    <Loader type="Circles" height={80} width={80} color="black"/>
  </div>}
    {orders.length === 0 ? <h1 className={sharedStyles.emptyValueTitleStyle}>No Orders Yet!</h1> : orders.map(item => item)}
  </Fragment>;
};

export default Orders;
