import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import Fallback from "./fallback/fallback";

//lazy loading for the products component

const Products = React.lazy(() => import("./container/Products/Products.js"));
const ProdDetails = React.lazy(() =>
  import("./container/ProdDetails/ProdDetails")
);
const AddProd = React.lazy(() => import("./container/AddProd/AddProd.js"));
const AdminProducts = React.lazy(() =>
  import("./container/AdminProducts/AdminProducts.js")
);
const Cart = React.lazy(() => import("./container/Cart/Cart.js"));
const Orders = React.lazy(() => import("./container/Orders/Orders.js"));

//lazy loading for authentication components
const Logout = React.lazy(() => import("./container/auth/Logout/Logout.js"));
const Login = React.lazy(() => import("./container/auth/Login/Login.js"));
const Signup = React.lazy(() => import("./container/auth/Signup/Signup.js"));

//RELATED TO THE PAYMENT OUTPUT USING THE STRIPE
const SuccessPage = React.lazy(() =>
  import("./container/SuccessPayment/SuccessPayment.js")
);
const FailPayment = React.lazy(() =>
  import("./container/FailPayment/FailPayment")
);

//NOT FOUND PAGE
const NotFound = React.lazy(() => import("./container/NotFound/Page404.js"));

const App = () => {
  return (
    //wil refactor the fallback late
    <Suspense fallback={<Fallback />}>
      <Switch>
        <Route path="/" exact component={Products} />
        <Route path="/prod-details/:id" component={ProdDetails} />
        <Route path="/add-prod" component={AddProd} />
        <Route path="/my-products" component={AdminProducts} />
        <Route path="/cart" component={Cart} />
        <Route path="/success" component={SuccessPage} />
        <Route path="/failPayment" component={FailPayment} />
        <Route path="/orders" component={Orders} />
        <Route path="/auth/signup" component={Signup} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/logout" component={Logout} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default App;
