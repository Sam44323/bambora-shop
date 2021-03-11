import React, { PureComponent } from 'react';

import ProdDetails from '../../components/ProductDetails/ProductDetails';

class ProductDetails extends PureComponent {
  render() {
    return (
      <ProdDetails
        name='Prod 1'
        amount={9.99}
        image='https://media.gettyimages.com/photos/stack-of-books-picture-id157482029?s=612x612'
        desc='This is one of the best product in the industry'
      />
    );
  }
}

export default ProductDetails;
