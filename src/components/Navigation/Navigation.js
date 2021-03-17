import React, { PureComponent } from 'react';

import styles from './Navigtion.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { DESKTOP_CLASS, MOBILE_CLASS } from '../utils/uiconstants';

class Navigation extends PureComponent {
  render() {
    const hamburgerIcon = (
      <div className={styles.hamburgerIconSection}>
        <div className={styles.hamburgerLine}></div>
        <div className={styles.hamburgerLine}></div>
        <div className={styles.hamburgerLine}></div>
      </div>
    );
    return (
      <div className={styles.desktopSection}>
        {hamburgerIcon}
        <h1 className={styles.navigationTitle}>Bambora Shop</h1>
        <div className={styles.navigationSection}>
          <NavigationItem path='/' classValue={DESKTOP_CLASS}>
            Products
          </NavigationItem>
          <NavigationItem path='/my-products' classValue={DESKTOP_CLASS}>
            My Products
          </NavigationItem>
          <NavigationItem path='/add-prod' classValue={DESKTOP_CLASS}>
            Add Product
          </NavigationItem>
          <NavigationItem path='/cart' classValue={DESKTOP_CLASS}>
            Cart
          </NavigationItem>
          <NavigationItem path='/orders' classValue={DESKTOP_CLASS}>
            Orders
          </NavigationItem>
          <NavigationItem path='/auth/signup' classValue={DESKTOP_CLASS}>
            Sign Up
          </NavigationItem>
          <NavigationItem path='/auth/login' classValue={DESKTOP_CLASS}>
            Log In
          </NavigationItem>
          <NavigationItem path='/auth/logout' classValue={DESKTOP_CLASS}>
            Logout
          </NavigationItem>
        </div>
      </div>
    );
  }
}

export default Navigation;
