import {useEffect} from 'react';

import styles from './Logout.module.css'

const Logout = props => {
  useEffect(() => {
    localStorage.clear();
    props.history.push('/auth/login')
  }, [props])

  return <div>
  <h1>Logging you out!</h1>
  </div>
}

export default Logout