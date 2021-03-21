import React, { PureComponent } from 'react';

import styles from './Navigtion.module.css';
import navItemCreator from '../utils/navItemCreator';
import { DESKTOP_CLASS, MOBILE_CLASS } from '../utils/uiconstants';

class Navigation extends PureComponent {
  state ={
    showbackDrop: false
  }

  changeBackDrop = (value) => this.setState({showbackDrop: value})

  render() {
    const hamburgerIcon = (
      <div className={styles.hamburgerIconSection} onClick={() => this.changeBackDrop(true)}>
        <div className={styles.hamburgerLine}></div>
        <div className={styles.hamburgerLine}></div>
        <div className={styles.hamburgerLine}></div>
      </div>
    );

  const mobileNav = navItemCreator(MOBILE_CLASS);
  const desktopNav = navItemCreator(DESKTOP_CLASS);
    return (
      <React.Fragment>
      {this.state.showbackDrop && <div className={styles.backdropStyle} onClick={() => this.changeBackDrop(false)}></div>}
      <div className={styles.navigationRoot}>
        {hamburgerIcon}
        <h1 className={styles.navigationTitle}>Bambora Shop</h1>
        <div className={styles.desktopNavigationSection}>
          {desktopNav}
        </div>
        {this.state.showbackDrop && <div className={styles.mobileNavigationSection} onClick={() => this.changeBackDrop(false)}>
          {mobileNav}
        </div>}
      </div>
      </React.Fragment>
    );
  }
}

export default Navigation;
