import {Fragment} from 'react';
import Loader from 'react-loader-spinner';

import Navigation from '../components/Navigation/Navigation';
import sharedStyles from '../container/shared/styles.module.css';

const Fallback = () => <Fragment>
  <Navigation/>
  <div className={sharedStyles.loadingSection}>
    <Loader type="Circles" height={80} width={80} color="salmon"/>
  </div>
</Fragment>

export default Fallback;