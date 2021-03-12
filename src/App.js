import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

//lazy loading for the products component

const Products = React.lazy(() => import('./container/Products/Products.js'));
const ProdDetails = React.lazy(() =>
  import('./container/ProdDetails/ProdDetails')
);
const AddProd = React.lazy(() => import('./container/AddProd/AddProd.js'));

//NOT FOUND PAGE
const NotFound = React.lazy(() => import('./container/NotFound/Page404.js'));

const App = () => {
  return (
    //wil refactor the fallback later
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path='/' exact component={Products} />
        <Route path='/prod-details/:id' component={ProdDetails} />
        <Route path='/add-prod' component={AddProd} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default App;
