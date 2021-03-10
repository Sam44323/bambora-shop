import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

//lazy loading for the products component

const Products = React.lazy(() => import('./container/Products/Products.js'));

const App = () => {
  return (
    //wil refactor the fallback later
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path='/' component={Products} />
      </Switch>
    </Suspense>
  );
};

export default App;
