import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import HomePage from './containers/home-page';
import GamePage from './containers/game-page';
import { ZGamesApi } from './services';
import './App.css';

class App extends React.Component {
  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  constructor(props) {
    super(props);
    this.zGamesApi.setHistory(props.history);
  }

  public render() {
    return (
      <Switch>
        <Route path='/games' component={HomePage} />
        <Route path='/game/:id' component={GamePage} />
        <Redirect from='*' to='/games' />
      </Switch>
    );
  }

}

export default withRouter(App);
