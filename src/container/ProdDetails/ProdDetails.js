import React, { useEffect, useState } from 'react';

import ProdDetails from '../../components/ProductDetails/ProductDetails';
import axios from 'axios';

const ProductDetails = (props) => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/bambora-shop/products/get-prod/${props.match.params.id}`
      )
      .then((response) => {
        setProduct(response.data.product);
      })
      .catch((err) => console.log(err));
  }, [props]);
  return (
    <ProdDetails
      name={product.name}
      amount={product.amount}
      image={product.image}
      desc={product.description}
    />
  );
};

export default ProductDetails;
