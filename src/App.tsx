import React, { Component, ComponentType } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import {
  HomePage,
  GamesPage,
  GamePage,
  RatingPage,
  RulesPage,
  ProfilePage,
  AboutPage,
} from './containers';
import { Activate } from './components';
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
        <Route path='/activate/:token' component={Activate} />
        <Route path='/:token' component={HomePage} />
        <Redirect from='*' to='/home' />
      </Switch>
    );
  }

}

export default withRouter(App as ComponentType<any>);
