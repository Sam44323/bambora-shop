import { useCallback, useEffect, useState, Fragment} from 'react';

import sharedStyles from '../shared/styles.module.css';
import Loader from 'react-loader-spinner';
import ProductItem from '../../components/ProductItem/ProductItem';
import Navigation from '../../components/Navigation/Navigation';
import tokenChecker from '../../components/utils/tokenChecker';
import axios from 'axios';

const AdminProducts = (props) => {
  const [prods, setProds] = useState([]);
  const [hasProds, setHasProds] = useState(true);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if(!tokenChecker()){
      return props.history.replace('/auth/login')
    }
    setLoading(true);
    axios
      .get(
        'http://localhost:5000/bambora-shop/products/get-adminProds/creator 1'
      )
      .then((prods) => {

        setProds(prods.data.products);
        setHasProds(prods.data.products.length > 0);
        setLoading(false);
        
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  }, [props]);

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

  return <Fragment>
  <Navigation/>
  {loading && <div className={sharedStyles.loadingSection}>
    <Loader type="Circles" height={80} width={80} color="black"/>
  </div>}
    <div className={sharedStyles.productsSection}>
      {prods.length === 0 && !hasProds ? (
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
</Fragment>
};

export default AdminProducts;
