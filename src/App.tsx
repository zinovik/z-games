import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

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
import './App.scss';

export default class App extends Component<{}, {}> {
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
