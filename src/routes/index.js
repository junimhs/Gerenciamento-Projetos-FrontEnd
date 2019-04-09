import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import history from './history';
import Private from './private';
import Guest from './guest';
// Importando as paginas
import Main from '~/pages/Main';
import SignIn from '~/pages/Auth/SignIn';
import SignUp from '~/pages/Auth/SignUp';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Guest path="/signin" component={SignIn} />
      <Guest path="/signUp" component={SignUp} />
      <Private path="/" exact component={Main} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
