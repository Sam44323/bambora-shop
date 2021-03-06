import { useCallback, useState, Fragment } from "react";

import sharedStyles from "../../shared/styles.module.css";
import Navigation from "../../../components/Navigation/Navigation";
import btnStyles from "../../../components/Button/Button.module.css";
import InputElement from "../../../components/InputElement/InputElement";
import Button from "../../../components/Button/Button";
import errorHandlerHOC from "../../../HOC/formErrorHandler";
import axios from "axios";

//util functions
import { checkValidity } from "../../../components/utils/checkValidity";

const Login = (props) => {
  const [formState, setFormState] = useState([
    {
      name: "email",
      type: "email",
      isValid: false,
      touched: false,
      value: "",
      message: "Please enter your email!",
    },
    {
      name: "password",
      type: "password",
      isValid: false,
      touched: false,
      value: "",
      message: "Please enter a password of atlest 5 characters!",
    },
  ]);

  const changeValue = useCallback(
    (name, value, type) => {
      const itemIndex = formState.findIndex((item) => item.name === name);
      let itemObj = formState[itemIndex];
      itemObj.touched = true;
      itemObj.value = value;
      itemObj.isValid = checkValidity(type, value);
      formState[itemIndex] = itemObj;
      setFormState([...formState]);
    },
    [formState]
  );

  const submitForm = useCallback(() => {
    const data = {};
    for (let item of formState) {
      data[item.name] = item.value;
    }
    axios
      .post("http://localhost:5000/bambora-shop/users/login-user", data)
      .then((response) => {
        if (response) {
          const expiresTime = new Date();
          expiresTime.setHours(expiresTime.getHours() + 1);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("expiresIn", expiresTime.toISOString());
          props.history.replace("/");
        }
      })
      .catch((err) => console.log(err));
  }, [props, formState]);

  return (
    <Fragment>
      <Navigation />
      <div className={sharedStyles.FormSection}>
        <h1 className={sharedStyles.FormTitle}>Login</h1>
        {formState.map((item) => (
          <InputElement
            key={item.name}
            name={item.name}
            type={item.type}
            value={item.value}
            changeAction={(name, value, type) => changeValue(name, value, type)}
            isValid={item.isValid}
            touched={item.touched}
            invalidMessage={item.message}
          />
        ))}
        <Button class={btnStyles.SuccessBtn} clickAction={submitForm}>
          Login
        </Button>
      </div>
    </Fragment>
  );
};

export default errorHandlerHOC(Login);
