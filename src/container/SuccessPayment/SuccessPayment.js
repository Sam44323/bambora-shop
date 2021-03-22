import React, { useEffect } from "react";
import styles from "./SucessPayment.module.css";

import Navigation from "../../components/Navigation/Navigation";
import axios from "axios";

const SuccessPayment = (props) => {
  useEffect(() => {
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
      });
  }, [props]);

  return (
    <React.Fragment>
      <Navigation />
      <div className={styles.paymentSection}>
        <h1 className={styles.paymentTitle}>Thank you for you order!</h1>
      </div>
    </React.Fragment>
  );
};

export default SuccessPayment;
