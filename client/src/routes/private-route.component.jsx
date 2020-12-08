import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Spinner from '../components/spinner/spinner.component';

const PrivateRoute = ({
  component: Component,
  auth: { isLoading, currentUser },
  ...otherProps
}) => (
  <Route
    {...otherProps}
    // render={props =>
    //   isLoading ? (
    //     <Spinner />
    //   ) : currentUser ? (
    //     <Component {...props} />
    //   ) : (
    //     <Redirect to='/' />
    //   )
    // }
    render={props => {
      console.log(isLoading);
      if (isLoading) {
        console.log('Loading');
        return <Spinner />;
      }

      if (currentUser) {
        console.log(currentUser);
        return <Component {...props} />;
      }

      console.log('No current user');
      return <Redirect to='/' />;
    }}
  />
);

export default PrivateRoute;
