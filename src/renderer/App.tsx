import React, { useCallback } from 'react';
import { useHistory, Switch, Route, Redirect } from 'react-router-dom';
import { Login } from '_renderer/Login';
import { AppProvider } from '_/renderer/contexts/AppContext';
import { useCurrentUser } from '_renderer/contexts/hooks';
import { AppNavbar } from '_renderer/AppNavbar';
import { AppBody } from '_renderer/AppBody';

const AppInternal: React.FC = () => {
  const currentUser = useCurrentUser();
  const history = useHistory();
  const goHome = useCallback(() => history.replace('/'), [history])

  return (
    <Switch>
      <Route path="/login">
        <Login onClose={goHome} />
      </Route>
      <Route path="/">
        {currentUser == null ? (
          <Redirect to="/login" />
        ) : (
          (
            <>
              <AppNavbar />
              <AppBody />
            </>
          )
        )}
      </Route>
    </Switch>
  );
}

export const App = () => {
  return (
    <AppProvider>
      <AppInternal />
    </AppProvider>
  );
};