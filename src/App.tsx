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
import { IUsersState, IErrorsState, INotificationsState, IError, INotification } from './interfaces';

import './App.scss';

interface IAppProps extends Props<{}> {
  isConnected: boolean,
  errors: IError[],
  notifications: INotification[],
}

const CurrentUserContext = createContext('test');

class App extends Component<IAppProps, {}> {

  public render() {
    const { isConnected, errors, notifications } = this.props;

    return (
      <CurrentUserContext.Provider value='test'>

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

const mapStateToProps = (state: { users: IUsersState, errors: IErrorsState, notifications: INotificationsState }) => ({
  isConnected: state.users.isConnected,
  errors: state.errors.errors,
  notifications: state.notifications.notifications,
});

const mapDispatchToProps = () => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
