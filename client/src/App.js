import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import { getCurrentUser } from './redux/user/user.actions';

import PrivateRoute from './routes/private-route.component';

import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Header from './components/header/header.component';

import { GlobalStyle } from './global.styles';

const LandingPage = lazy(() => import('./pages/landing/landing.component'));
const HomePage = lazy(() => import('./pages/homepage/homepage.component'));

const App = () => {
  const isLoading = useSelector(state => state.user.isLoading);
  const currentUser = useSelector(state => state.user.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div>
      <GlobalStyle />
      {currentUser ? <Header /> : null}
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route
              exact
              path='/'
              render={() =>
                isLoading ? (
                  <Spinner />
                ) : currentUser ? (
                  <Redirect to='/home' />
                ) : (
                  <LandingPage />
                )
              }
            />
            <PrivateRoute
              exact
              path='/home'
              component={HomePage}
              auth={{ isLoading, currentUser }}
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

export default App;
