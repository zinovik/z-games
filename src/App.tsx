import React, { Component, Props, createContext } from 'react';
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
import { Activate, Loading, NotificationError, Notification } from './components';
import { IState, IUser, IError, INotification } from './interfaces';

import './App.scss';

export const CurrentUserContext = createContext(null as IUser | null);

interface IAppProps extends Props<{}> {
  isConnected: boolean,
  currentUser: IUser,
  errors: IError[],
  notifications: INotification[],
}

class App extends Component<IAppProps, {}> {

  public render() {
    const { isConnected, currentUser, errors, notifications } = this.props;

    return (
      <CurrentUserContext.Provider value={currentUser}>

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

        {errors.map(error => (
          <NotificationError key={`error${error.id}`} id={error.id} message={error.message} />
        ))}

        {notifications.map(notification => (
          <Notification key={`notification${notification.id}`} id={notification.id} message={notification.message} />
        ))}

      </CurrentUserContext.Provider>
    );
  }

}

const mapStateToProps = (state: IState) => ({
  isConnected: state.users.isConnected,
  currentUser: state.users.currentUser,
  errors: state.errors.errors,
  notifications: state.notifications.notifications,
});

const mapDispatchToProps = () => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
