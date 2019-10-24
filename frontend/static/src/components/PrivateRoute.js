import React from 'react';
import { Redirect, Route } from 'react-router-dom';

let isAuthenticated = localStorage.getItem('my-app-user') !== null ? true : false
console.log(isAuthenticated);
// Find the component property defined on props (Note: lowercase component)
// and assign it to a new location in state we call Component (Note: capital Component).
// Then, take all remaining properties defined on the props object
// and collect them inside an argument called rest.
// you're simply pulling off the rest, that's why the arg is named rest
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login/',
        state: { from: props.location }
      }}/>
    ))}
   />
);

export default PrivateRoute;
