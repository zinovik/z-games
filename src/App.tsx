import React, { Component, ComponentType } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import HomePage from './containers/home-page';
import GamesPage from './containers/games-page';
import GamePage from './containers/game-page';
import RatingPage from './containers/rating-page';
import RulesPage from './containers/rules-page';
import ProfilePage from './containers/profile-page';
import AboutPage from './containers/about-page';
import { ZGamesApi, IHistory } from './services';
import './App.scss';

interface IAppProps {
  history: IHistory,
};

class App extends Component<IAppProps, {}> {
  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  constructor(props: IAppProps) {
    super(props);
    this.zGamesApi.setHistory(props.history);
  }

  public render() {
    return (
      <Switch>
        <Route path='/home' component={HomePage} />
        <Route path='/games' component={GamesPage} />
        <Route path='/game/:number' component={GamePage} />
        <Route path='/rating' component={RatingPage} />
        <Route path='/rules' component={RulesPage} />
        <Route path='/profile' component={ProfilePage} />
        <Route path='/about' component={AboutPage} />
        <Route path='/:token' component={HomePage} />
        <Redirect from='*' to='/home' />
      </Switch>
    );
  }

}

export default withRouter(App as ComponentType<any>);
