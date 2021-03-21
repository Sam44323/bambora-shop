import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.module.css';

const navItem = (props) => {
  return props.show ? <NavLink
    to={props.path}
    exact
    className={styles[props.classValue]}
    activeStyle={{
      color: 'white',
      backgroundColor: 'black',
      borderRadius: '10px',
    }}
  >
    {props.children}
  </NavLink>: null
  
}

export default navItem;
