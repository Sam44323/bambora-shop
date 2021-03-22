import { useState, useEffect, Fragment, useCallback } from "react";

import styles from "./cart.module.css";
import Navigation from "../../components/Navigation/Navigation";
import btnStyle from "../../components/Button/Button.module.css";
import Loader from "react-loader-spinner";
import sharedStyles from "../shared/styles.module.css";
import tokenChecker from "../../components/utils/tokenChecker";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import errorMessageChecker from "../../components/utils/errorMessageChecker";
import axios from "axios";

const Cart = (props) => {
  const [cart, setCart] = useState([]);
  const [hasItems, setHasItems] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");

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
        setLoading(false);
        if (response.data.cart) {
          setCart(response.data.cart);
          setHasItems(response.data.cart.length > 0);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(errorMessageChecker(err));
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
          setHasItems(cartItems.length > 0);
        })
        .catch((err) => {
          setError(errorMessageChecker(err));
        });
    },
    [cart]
  );

  const incDcrCart = useCallback(
    (value, prodId) => {
      axios
        .post(
          `http://localhost:5000/bambora-shop/users/incr-dcr/${prodId}?type=${value}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          let cartItems = [...cart];
          cartItems = cartItems.map((item) => {
            if (value === "inc") {
              item.qty += 1;
            } else {
              item.qty -= 1;
            }
            return item;
          });
          cartItems = cartItems.filter((item) => item.qty !== 0);
          setCart(cartItems);
        })
        .catch((err) => {
          setError(errorMessageChecker(err));
        });
    },
    [cart]
  );

  const checkoutAction = useCallback(() => {
    axios
      .post("http://localhost:5000/bambora-shop/users/checkout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response) {
          props.history.push("/orders");
        }
      })
      .catch((err) => setError(errorMessageChecker(err)));
  }, [props]);

  //will change the item show later
  return (
    <Fragment>
      <Navigation />
      {err && (
        <Modal>
          <ErrorModal message={err} buttonAction={() => setError("")} />
        </Modal>
      )}
      {hasItems && !loading && (
        <div className={styles.checkoutBtnSection}>
          <Button class={`${btnStyle.SuccessBtn}`} clickAction={checkoutAction}>
            Checkout
          </Button>
        </div>
      )}
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
                clickAction={() => incDcrCart("inc", item._id)}
              >
                +
              </Button>
              <Button
                class={`${btnStyle.SuccessBtn}`}
                clickAction={() => incDcrCart("dcr", item._id)}
              >
                -
              </Button>
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
