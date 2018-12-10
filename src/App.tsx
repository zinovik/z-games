import React, { Component, ComponentType } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import HomePage from './containers/home-page';
import GamesPage from './containers/games-page';
import GamePage from './containers/game-page';
import { ZGamesApi, History } from './services';
import './App.css';

interface AppProps {
  history: History,
};

class App extends Component<AppProps, {}> {
  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  constructor(props: AppProps) {
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

export default withRouter(App as ComponentType<any>);
