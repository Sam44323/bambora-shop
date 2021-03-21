import {Fragment} from 'react';

import Navigation from '../components/Navigation/Navigation';

const Fallback = () => <Fragment>
  <Navigation/>
  <h1>Loading...</h1>
</Fragment>

export default Fallback;