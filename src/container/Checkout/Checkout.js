import React, { useState, useCallback, useEffect } from "react";
import Cards from "react-credit-cards";

import btnStyles from "../../components/Button/Button.module.css";
import "react-credit-cards/es/styles-compiled.css";
import "./Checkout.module.css";
import Button from "../../components/Button/Button";
import Navigation from "../../components/Navigation/Navigation";
import tokenChecker from "../../components/utils/tokenChecker";
import axios from "axios";

const Checkout = (props) => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");

  useEffect(() => {
    if (!tokenChecker) {
      return props.hitory.push("/auth/login");
    }
  }, [props]);

  const payHandler = useCallback(() => {
    axios
      .get("http://localhost:5000/bambora-shop/users/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Navigation />
      <br />
      <Cards
        number={number}
        name={name}
        expiry={expiry}
        cvc={cvc}
        focused={focus}
      />
      <form>
        <input
          type="tel"
          name="number"
          placeholder="Card Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <br />
        <input
          type="text"
          name="number"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <br />
        <input
          type="text"
          name="expiry"
          placeholder="MM/YY Expiry"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <br />
        <input
          type="tel"
          name="cvc"
          placeholder="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <br />
      </form>
      <Button class={`${btnStyles.SuccessBtn}`} clickAction={payHandler}>
        PAY
      </Button>
    </div>
  );
};

export default Checkout;
