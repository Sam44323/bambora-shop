import { useState, useCallback } from 'react';

import sharedStyles from '../../shared/styles.module.css';
import btnStyles from '../../../components/Button/Button.module.css';
import InputElement from '../../../components/InputElement/InputElement';
import Button from '../../../components/Button/Button';
import axios from 'axios';

//add the button disabled logic later to the form!

const Signup = (props) => {
  const [formState, setFormState] = useState([
    {
      name: 'name',
      type: 'text',
      isValid: false,
      touched: false,
      value: '',
      message: 'Please enter your name!',
    },
    {
      name: 'email',
      type: 'email',
      isValid: false,
      touched: false,
      value: '',
      message: 'Please enter your email!',
    },
    {
      name: 'password',
      type: 'password',
      isValid: false,
      touched: false,
      value: '',
      message: 'Please enter a password of atlest 5 characters!',
    },
  ]);

  const checkValidity = useCallback((type, value) => {
    let valid;
    switch (type) {
      case 'text':
        valid = value !== '';
        break;

      case 'email':
        valid = value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
        break;

      case 'password':
        valid = value.length >= 5;
        break;

      default:
        return;
    }
    return valid;
  }, []);

  const submitForm = useCallback(() => {
    const data = {};
    for (let item of formState) {
      data[item.name] = item.value;
    }
    axios
      .post('http://localhost:5000/bambora-shop/users/add-user', data)
      .then(() => {
        props.history.replace('/');
      })
      .catch((err) => console.log(err));
  }, [props, formState]);

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
    [formState, checkValidity]
  );
  return (
    <div className={sharedStyles.FormSection}>
      <h1 className={sharedStyles.FormTitle}>Create Account!</h1>
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
        Create
      </Button>
    </div>
  );
};

export default Signup;
