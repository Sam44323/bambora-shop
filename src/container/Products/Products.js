import React, { PureComponent } from "react";

import sharedStyles from "../shared/styles.module.css";
import tokenChecker from "../../components/utils/tokenChecker";
import ProductItem from "../../components/ProductItem/ProductItem";
import Navigation from "../../components/Navigation/Navigation";
import Loader from "react-loader-spinner";
import axios from "axios";

class Products extends PureComponent {
  state = {
    products: [],
    hasProds: true,
    loading: false,
  };

  componentDidMount() {
    if (!tokenChecker()) {
      return this.props.history.push("/auth/login");
    }
    this.setState({ loading: true });
    axios
      .get("http://localhost:5000/bambora-shop/products/get-prods", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((prods) => {
        this.setState({
          products: [...prods.data.products],
          hasProds: prods.data.products.length > 0,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  cartAction = (prodId) => {
    console.log(prodId);
    axios
      .post(
        `http://localhost:5000/bambora-shop/users/cart-action/${prodId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        this.props.history.push("/cart");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        cartAction={this.cartAction}
      />
    ));
    return (
      <React.Fragment>
        <Navigation />
        {this.state.loading && (
          <div className={sharedStyles.loadingSection}>
            <Loader type="Circles" height={80} width={80} color="black" />
          </div>
        )}
        {products.length === 0 && !this.state.hasProds ? (
          <h1 className={sharedStyles.noProductsTitle}>No Products to show!</h1>
        ) : (
          <div className={sharedStyles.productsSection}>{products}</div>
        )}
      </React.Fragment>
    );
  }
}

export default Products;
