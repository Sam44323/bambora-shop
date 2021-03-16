import { PureComponent } from 'react';

import styles from './AddProd.module.css';
import Input from '../../components/InputElement/InputElement';
import btnStyles from '../../components/Button/Button.module.css';
import Button from '../../components/Button/Button';
import axios from 'axios';

class AddProd extends PureComponent {
  state = {
    name: {
      isValid: false,
      touched: false,
      value: '',
      message: 'Please give a name for the product!',
    },
    image: {
      isValid: false,
      touched: false,
      value: '',
      message: 'Please give an image for the product!',
    },
    amount: {
      type: 'number',
      isValid: false,
      touched: false,
      value: '',
      message: 'Please give an amount for the product!',
    },
    desc: {
      type: 'textarea',
      isValid: false,
      touched: false,
      value: '',
      message: 'Please give a description for the product!',
    },
  };

  changeValue = (name, value, type) => {
    const eleValue = { ...this.state[name] };
    eleValue.value = value;
    eleValue.touched = true;
    eleValue.isValid =
      (type === 'number' && value < 0) || value === '' ? false : true;
    this.setState({ [name]: eleValue });
  };

  resetForm = () => {
    const updatedValue = { ...this.state };
    for (let item in updatedValue) {
      updatedValue[item].value = '';
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
      .post('http://localhost:5000/bambora-shop/products/add-prod', data)
      .then(() => {
        this.props.history.push('/');
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
          valid={!this.state[item].valid && this.state[item].touched}
          invalidMessage={item.message}
          type={this.state[item].type ? this.state[item].type : 'text'}
          changeAction={this.changeValue}
        />
      );
    }
    return (
      <div className={styles.addProductSection}>
        <h1 className={styles.addProductTitle}>Add a product!</h1>
        <div className={styles.addProdInputSection}>{inputValue}</div>
        <br />
        <Button class={btnStyles.SuccessBtn} clickAction={this.submitForm}>
          Add
        </Button>
      </div>
    );
  }
}

export default AddProd;
