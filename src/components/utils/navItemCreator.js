import NavigationItem from '../Navigation/NavigationItem/NavigationItem';
import {NAMES, PATHS} from '../utils/navConstants';

const navItemCreator = (classValue) => {
  const navItems = [];
  let show;
  for(let i=0; i<NAMES.length; i++){

    if(NAMES[i] === 'Sign Up' || NAMES[i] === 'Log In'){
      show = !(localStorage.getItem('token') &&
      new Date(localStorage.getItem('expiresIn')) > new Date()); // if the expiration time is greater then don't show
    }else{
      show = localStorage.getItem('token') &&
      new Date(localStorage.getItem('expiresIn')) > new Date();
    }
    navItems.push(
      <NavigationItem key={PATHS[i]} path={PATHS[i]} classValue={classValue} show={show}>{NAMES[i]}</NavigationItem>
    )

  }
  return navItems;
}

export default navItemCreator;