import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.module.css';

const navItem = (props) => (
  <NavLink to={props.path} className={styles[props.classValue]}>
    {props.children}
  </NavLink>
);

export default navItem;
