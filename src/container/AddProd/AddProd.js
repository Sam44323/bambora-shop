import { PureComponent, Fragment } from "react";

import sharedStyle from "../shared/styles.module.css";
import Navigation from "../../components/Navigation/Navigation";
import Input from "../../components/InputElement/InputElement";
import tokenChecker from "../../components/utils/tokenChecker";
import btnStyles from "../../components/Button/Button.module.css";
import Button from "../../components/Button/Button";
import errorHandlerHOC from "../../HOC/formErrorHandler";
import axios from "axios";

class AddProd extends PureComponent {
  state = {
    name: {
      isValid: false,
      touched: false,
      value: "",
      message: "Please give a name for the product!",
    },
    image: {
      isValid: false,
      touched: false,
      value: "",
      message: "Please give an image for the product!",
    },
    amount: {
      type: "number",
      isValid: false,
      touched: false,
      value: "",
      message: "Please give an amount for the product!",
    },
    desc: {
      type: "textarea",
      isValid: false,
      touched: false,
      value: "",
      message: "Please give a description for the product!",
    },
  };

  componentDidMount() {
    if (!tokenChecker()) {
      return this.props.history.replace("/auth/login");
    }
  }

  changeValue = (name, value, type) => {
    const eleValue = { ...this.state[name] };
    eleValue.value = value;
    eleValue.touched = true;
    eleValue.isValid =
      (type === "number" && value < 0) || value === "" ? false : true;
    this.setState({ [name]: eleValue });
  };

  resetForm = () => {
    const updatedValue = { ...this.state };
    for (let item in updatedValue) {
      updatedValue[item].value = "";
      updatedValue[item].isValid = false;
      updatedValue[item].touched = false;
    }
    this.setState({
      name: { ...updatedValue.name },
      image: { ...updatedValue.image },
      desc: { ...updatedValue.desc },
      amount: { ...updatedValue.amount },
    });
  };

  submitForm = () => {
    const data = {};
    for (let item in this.state) {
      data[item] = this.state[item].value;
    }
    axios
      .post("http://localhost:5000/bambora-shop/products/add-prod", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res) {
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const inputValue = [];
    for (const item in this.state) {
      inputValue.push(
        <Input
          key={item}
          name={item}
          value={this.state[item].value}
          isValid={this.state[item].isValid}
          touched={this.state[item].touched}
          invalidMessage={this.state[item].message}
          type={this.state[item].type ? this.state[item].type : "text"}
          changeAction={this.changeValue}
        />
      );
    }
    return (
      <Fragment>
        <Navigation />
        <div className={sharedStyle.FormSection}>
          <h1 className={sharedStyle.FormTitle}>Add a product!</h1>
          <div>{inputValue}</div>
          <br />
          <Button class={btnStyles.SuccessBtn} clickAction={this.submitForm}>
            Add
          </Button>
        </div>
      </Fragment>
    );
  }
}

export default errorHandlerHOC(AddProd);
