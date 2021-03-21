import {Fragment} from 'react';

import styles from './Page404.module.css'
import Navigation from '../../components/Navigation/Navigation';

const notFound = () => <Fragment>
<Navigation/>
<h1 className={styles.errorContent}>Not Found!</h1></Fragment>;

export default notFound;
