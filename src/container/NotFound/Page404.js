import {Fragment} from 'react';

import sharedStyles from '../shared/styles.module.css';
import Navigation from '../../components/Navigation/Navigation';

const notFound = () => <Fragment>
<Navigation/>
<h1 className={sharedStyles.emptyValueTitleStyle}>Not Found!</h1></Fragment>;

export default notFound;
