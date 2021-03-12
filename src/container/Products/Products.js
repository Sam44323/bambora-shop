import React, { PureComponent } from 'react';

import styles from './Products.module.css';
import ProductItem from '../../components/ProductItem/ProductItem';

class Products extends PureComponent {
  state = {
    products: [
      {
        id: 1,
        name: 'Prod 1',
        image:
          'https://media.gettyimages.com/photos/stack-of-books-picture-id157482029?s=612x612',
        amount: 9.99,
      },
      {
        id: 2,
        name: 'Prod 2',
        image:
          'https://media.gettyimages.com/photos/stack-of-books-picture-id157482029?s=612x612',
        amount: 16.99,
      },
      {
        id: 3,
        name: 'Prod 3',
        image:
          'https://media.gettyimages.com/photos/stack-of-books-picture-id157482029?s=612x612',
        amount: 3.99,
      },
    ],
  };
  render() {
    const products = this.state.products.map((item) => (
      <ProductItem
        key={item.id}
        id={item.id}
        name={item.name}
        image={item.image}
        amount={item.amount}
        buttonAction={() => this.props.history.push(`/prod-details/${item.id}`)}
      />
    ));
    return <div className={styles.productsSection}>{products}</div>;
  }
}

export default Products;
