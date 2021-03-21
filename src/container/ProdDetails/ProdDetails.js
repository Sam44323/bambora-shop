import React, { useEffect, useState } from 'react';

import ProdDetails from '../../components/ProductDetails/ProductDetails';
import Navigation from '../../components/Navigation/Navigation';
import tokenChecker from '../../components/utils/tokenChecker';
import axios from 'axios';

const ProductDetails = (props) => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    if(!tokenChecker){
      props.history.push('/auth/login')
    }
    axios
      .get(
        `http://localhost:5000/bambora-shop/products/get-prod/${props.match.params.id}`
      )
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((err) => console.log(err));
  }, [props]);
  return<React.Fragment>
  <Navigation/>
  <ProdDetails
      name={product.name}
      amount={product.amount}
      image={product.image}
      desc={product.description}
    /> </React.Fragment>
    
  
};

export default ProductDetails;
