import {useEffect, Fragment} from 'react';

import styles from './Logout.module.css'
import Navigation from '../../../components/Navigation/Navigation';

const Logout = props => {
  useEffect(() => {
    localStorage.clear();
    props.history.push('/auth/login')
  }, [props])

  return <Fragment>
  <Navigation/>
  <h1>Logging you out!</h1>
  </Fragment>
}

export default Logout