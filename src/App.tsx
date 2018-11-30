import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import HomePage from './containers/home-page';
import GamesPage from './containers/games-page';
import GamePage from './containers/game-page';
import { ZGamesApi } from './services';
import './App.css';

class App extends React.Component<{}, {}> {
  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  constructor(props) {
    super(props);
    this.zGamesApi.setHistory(props.history);
  }

  public render() {
    return (
      <Switch>
        <Route path='/home' component={HomePage} />
        <Route path='/games' component={GamesPage} />
        <Route path='/game/:number' component={GamePage} />
        <Redirect from='*' to='/home' />
      </Switch>
    );
  }

}

export default withRouter(App);
