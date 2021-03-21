import React, { PureComponent } from 'react';

import sharedStyles from '../shared/styles.module.css';
import tokenChecker from '../../components/utils/tokenChecker';
import ProductItem from '../../components/ProductItem/ProductItem';
import Navigation from '../../components/Navigation/Navigation';
import axios from 'axios';

class Products extends PureComponent {
  state = {
    products: [],
    hasProds: true,
  };

  componentDidMount() {
    if(!tokenChecker()){
      return this.props.history.push('/auth/login')
    }
    axios
      .get('http://localhost:5000/bambora-shop/products/get-prods')
      .then((prods) => {
        this.setState({ products: [...prods.data.products] , hasProds: prods.data.products.length > 0});
      })
      .catch((err) => console.log(err));
  }

  render() {
    const products = this.state.products.map((item) => (
      <ProductItem
        key={item._id}
        id={item._id}
        name={item.name}
        image={item.image}
        amount={item.amount}
        buttonAction={() =>
          this.props.history.push(`/prod-details/${item._id}`)
        }
        deleteProduct={this.deleteProdAction}
      />
    ));
    return <React.Fragment>
    <Navigation/>
    {products.length === 0 && !this.state.hasProds ? (
      <h1 className={sharedStyles.noProductsTitle}>No Products to show!</h1>
    ) : (
      <div className={sharedStyles.productsSection}>{products}</div>
    )}
    </React.Fragment>
  }
}

export default Products;
