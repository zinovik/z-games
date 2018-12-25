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
        <Route path='/rating' component={HomePage} />
        <Route path='/rules' component={HomePage} />
        <Route path='/profile' component={HomePage} />
        <Route path='/about' component={HomePage} />
        <Route path='/:token' component={HomePage} />
        <Redirect from='*' to='/home' />
      </Switch>
    );
  }

}

export default withRouter(App as ComponentType<any>);
