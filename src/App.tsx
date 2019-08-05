import React, { Props, createContext } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { HomePage } from './containers/home-page';
import { AllGamesPage } from './containers/all-games-page';
import { InvitesPage } from './containers/invites-page';
import { GamePage } from './containers/game-page';
import { RatingPage } from './containers/rating-page';
import { RulesPage } from './containers/rules-page';
import { ProfilePage } from './containers/profile-page';
import { AboutPage } from './containers/about-page';
import { ActivatePage } from './containers/activate-page';
import { ResetPage } from './containers/reset-page';
import { Loading } from './components/loading';
import { NotificationError } from './components/notification-error';
import { Notification } from './components/notification';
import { Confirm } from './components/confirm';
import { YourTurn } from './components/your-turn';
import {
  removeNotification as removeNotificationWithoutDispatch,
  removeError as removeErrorWithoutDispatch,
  removeGameUser as removeGameWithoutDispatch,
  closeInvite as closeInviteWithoutDispatch,
} from './actions';
import { IState, IUser, IError, INotification, IInvite } from './interfaces';

import './App.scss';

export const CurrentUserContext = createContext(null as IUser | null);

interface IAppProps extends Props<{}> {
  isConnected: boolean;
  currentUser: IUser | null;
  errors: IError[];
  notifications: INotification[];
  removingGame: string | null;
  activeInvite: IInvite | null;
  isYourTurn: boolean;
  removeError: (errorId: number) => void;
  removeNotification: (errorId: number) => void;
  removeGame: (isConfirmed: boolean) => void;
  closeInvite: (isConfirmed: boolean) => void;
}

const App = ({
  isConnected,
  currentUser,
  errors,
  notifications,
  removeError,
  removeNotification,
  removingGame,
  activeInvite,
  removeGame,
  closeInvite,
  isYourTurn,
}: IAppProps) => {
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route path="/all-games" component={AllGamesPage} />
        <Route path="/invites" component={InvitesPage} />
        <Route path="/game/:number" component={GamePage} />
        <Route path="/rating" component={RatingPage} />
        <Route path="/rules" component={RulesPage} />
        <Route path="/profile/:username" component={ProfilePage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/activate/:token" component={ActivatePage} />
        <Route path="/reset/:token" component={ResetPage} />
        <Route path="/:token" component={HomePage} />
        <Redirect from="*" to="/home" />
      </Switch>

      <Loading isConnected={isConnected} text="Connecting to the server..." />

      {errors.map(error => (
        <NotificationError key={`error${error.id}`} id={error.id} message={error.message} removeError={removeError} />
      ))}

      {notifications.map(notification => (
        <Notification
          key={`notification${notification.id}`}
          id={notification.id}
          message={notification.message}
          removeNotification={removeNotification}
        />
      ))}

      {removingGame && <Confirm text="Are you sure?" confirm={removeGame} />}
      {activeInvite && (
        <Confirm text={`${activeInvite.createdBy.username} invites you to play ${activeInvite.game.name}. Join?`} confirm={closeInvite} />
      )}

      {isYourTurn && <YourTurn />}
    </CurrentUserContext.Provider>
  );
};

const mapStateToProps = (state: IState) => ({
  isConnected: state.users.isConnected,
  currentUser: state.users.currentUser,
  errors: state.errors.errors,
  notifications: state.notifications.notifications,
  removingGame: state.games.removingGame,
  activeInvite: state.users.activeInvite,
  isYourTurn: state.games.isYourTurn,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeError: bindActionCreators(removeErrorWithoutDispatch, dispatch),
  removeNotification: bindActionCreators(removeNotificationWithoutDispatch, dispatch),
  removeGame: bindActionCreators(removeGameWithoutDispatch, dispatch),
  closeInvite: bindActionCreators(closeInviteWithoutDispatch, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
