import React, { useEffect, useState } from 'react';

import ProdDetails from '../../components/ProductDetails/ProductDetails';
import sharedStyles from '../shared/styles.module.css'
import Navigation from '../../components/Navigation/Navigation';
import tokenChecker from '../../components/utils/tokenChecker';
import Loader from 'react-loader-spinner';
import axios from 'axios';

const ProductDetails = (props) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading]= useState(false);
  useEffect(() => {
    if(!tokenChecker){
      props.history.push('/auth/login')
    }
    setLoading(true);
    axios
      .get(
        `http://localhost:5000/bambora-shop/products/get-prod/${props.match.params.id}`,
        {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
      )
      .then((res) => {
        setProduct(res.data.product);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [props]);
  return<React.Fragment>
  <Navigation/>
  {loading ? <div className={sharedStyles.loadingSection}>
    <Loader type="Circles" height={80} width={80} color="black"/>
  </div> : <ProdDetails
      name={product.name}
      amount={product.amount}
      image={product.image}
      desc={product.description}
    /> }
  </React.Fragment>
    
  
};

export default ProductDetails;
