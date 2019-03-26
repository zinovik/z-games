import React, { Component, Fragment, Props } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  HomePage,
  GamesPage,
  GamePage,
  RatingPage,
  RulesPage,
  ProfilePage,
  AboutPage,
} from './containers';
import { Activate, Loading, NotificationError } from './components';
import { IUsersState, IGamesState } from './interfaces';

import './App.scss';

interface IAppProps extends Props<{}> {
  isConnected: boolean,
}

class App extends Component<IAppProps, {}> {

  public render() {
    const { isConnected } = this.props;

    return (
      <Fragment>

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

        <Loading isConnected={isConnected} text='Connecting to the server...' />

        <NotificationError />

      </Fragment>
    );
  }

}

const mapStateToProps = (state: { users: IUsersState, games: IGamesState }) => ({
  isConnected: state.users.isConnected,
});

const mapDispatchToProps = () => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
