import { useCallback, useEffect, useState } from 'react';

import ProductItem from '../../components/ProductItem/ProductItem';
import sharedStyles from '../shared/styles.module.css';
import axios from 'axios';

const AdminProducts = (props) => {
  const [prods, setProds] = useState([]);
  useEffect(() => {
    axios
      .get(
        'http://localhost:5000/bambora-shop/products/get-adminProds/creator 1'
      )
      .then((prods) => {
        setProds(prods.data.products);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteProduct = useCallback(
    (prodId) => {
      axios
        .delete(
          `http://localhost:5000/bambora-shop/products/delete-prod/${prodId}`
        )
        .then(() => {
          setProds(prods.filter((prod) => prod._id !== prodId));
        })
        .catch((err) => console.log(err));
    },
    [prods]
  );

  return (
    <div className={sharedStyles.productsSection}>
      {prods.length === 0 ? (
        <h1 className={sharedStyles.noProductsTitle}>You have no products!</h1>
      ) : (
        prods.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            amount={item.amount}
            buttonAction={() => props.history.push(`/prod-details/${item._id}`)}
            deleteAction={deleteProduct}
          />
        ))
      )}
    </div>
  );
};

export default AdminProducts;
