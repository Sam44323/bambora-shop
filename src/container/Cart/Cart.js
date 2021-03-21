import { useState, useEffect, Fragment, useCallback } from "react";

import styles from "./cart.module.css";
import Navigation from "../../components/Navigation/Navigation";
import btnStyle from "../../components/Button/Button.module.css";
import Loader from "react-loader-spinner";
import sharedStyles from "../shared/styles.module.css";
import tokenChecker from "../../components/utils/tokenChecker";
import Button from "../../components/Button/Button";
import axios from "axios";

const Cart = (props) => {
  const [cart, setCart] = useState([]);
  const [hasItems, setHasItems] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tokenChecker()) {
      return props.history.replace("/auth/login");
    }
    setLoading(true);
    axios
      .get("http://localhost:5000/bambora-shop/users/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setCart(response.data.cart);
          setHasItems(response.data.cart.length > 0);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [props]);

  const removeItem = useCallback(
    (prodId) => {
      axios
        .post(
          `http://localhost:5000/bambora-shop/users/remove-cartItem/${prodId}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          let cartItems = [...cart];
          cartItems = cartItems.filter((item) => item._id !== prodId);
          setCart(cartItems);
        })
        .catch((err) => console.log(err));
    },
    [cart]
  );

  //will change the item show later
  return (
    <Fragment>
      <Navigation />
      {loading && (
        <div className={sharedStyles.loadingSection}>
          <Loader type="Circles" height={80} width={80} color="black" />
        </div>
      )}
      {cart.length === 0 && !hasItems ? (
        <h1 className={sharedStyles.emptyValueTitleStyle}>
          Nothing in your cart!
        </h1>
      ) : (
        cart.map((item) => {
          return (
            <div className={styles.cardView} key={item._id}>
              <h1 className={styles.cartItemName}>{item.prodId.name}</h1>
              <p className={styles.cartItemQty}>{item.qty}</p>
              <Button
                class={`${btnStyle.SuccessBtn}`}
                clickAction={() => removeItem(item._id)}
              >
                Remove
              </Button>
            </div>
          );
        })
      )}
    </Fragment>
  );
};

export default Cart;
