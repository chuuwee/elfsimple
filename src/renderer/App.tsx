import React, { useCallback, useEffect, useState } from 'react';
import { Alignment, Callout, Card, H1, Navbar, Spinner } from '@blueprintjs/core';
import { useHistory, Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './Login';
import { AppProvider } from './contexts/App/AppContext';
import { useCurrentUser } from './contexts/App/hooks';
import { AppState, getInitialState } from './contexts/App/types';
import { Profile } from './Profile';

const AppNavbar: React.FC = () => {
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>elfsimPLE</Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Profile />
      </Navbar.Group>
    </Navbar>
  );
};

const AppInternal: React.FC = () => {
  const currentUser = useCurrentUser();
  const history = useHistory();
  const goHome = useCallback(() => history.replace('/'), [history])

  return (
    <>
      <Switch>
        <Route path="/login">
          <Login onClose={goHome} />
        </Route>
        <Route path="/">
          {currentUser == null ? (
            <Redirect to="/login" />
          ) : (
            <AppNavbar />
          )}
        </Route>
      </Switch>
    </>
  );
}

export const App = () => {
  const [initialState, setInitialState] = useState<AppState | null>(null);
  useEffect(() => { 
    window.api.invoke('getCurrentUser').then((username: string | undefined) => {
      setInitialState(getInitialState(username));
    });
  }, [])
  if (initialState == null) {
    return <Spinner />
  }
  return (
    <AppProvider initialState={initialState}>
      <AppInternal />
    </AppProvider>
  );
};