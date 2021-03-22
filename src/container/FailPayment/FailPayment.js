import React from "react";

import styles from "./FailPayment.module.css";
import Navigation from "../../components/Navigation/Navigation";

const FailPayment = () => (
  <React.Fragment>
    <Navigation />
    <div className={styles.paymentFailSection}>
      <h1 className={styles.paymentFailTitle}>
        Can't process your order now, Please try again!
      </h1>
    </div>
  </React.Fragment>
);

export default FailPayment;
