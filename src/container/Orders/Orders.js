import { useState, useEffect, Fragment } from "react";

import sharedStyles from "../shared/styles.module.css";
import Loader from "react-loader-spinner";
import Navigation from "../../components/Navigation/Navigation";
import Modal from "../../components/Modal/Modal";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import errorMessageChecker from "../../components/utils/errorMessageChecker";
import axios from "axios";

import tokenChecker from "../../components/utils/tokenChecker";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");

  useEffect(() => {
    if (!tokenChecker()) {
      return props.history.push("/auth/login");
    }
    setLoading(true);

    axios
      .get("http://localhost:5000/bambora-shop/users/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.orders.length > 0) {
          setOrders({ ...response.data.orders });
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(errorMessageChecker(err));
      });
  }, [props]);

  return (
    <Fragment>
      <Navigation />
      {err && (
        <Modal>
          <ErrorModal message={err} buttonAction={() => setError("")} />
        </Modal>
      )}
      {loading && (
        <div className={sharedStyles.loadingSection}>
          <Loader type="Circles" height={80} width={80} color="black" />
        </div>
      )}
      {orders.length === 0 && !loading ? (
        <h1 className={sharedStyles.emptyValueTitleStyle}>No Orders Yet!</h1>
      ) : (
        orders.map((item) => item)
      )}
    </Fragment>
  );
};

export default Orders;
