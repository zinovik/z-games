import React, { Component, Props } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import Header from '../../components/header';
import { Loading } from '../../components';
import { ZGamesApi } from '../../services';
import * as types from '../../constants';
import './index.css';

interface ProfilePageProps extends Props<{}> {
  currentUser: types.User,
  isConnected: boolean,
  allGames: types.Game[],
  usersOnline: types.User[],
}

class ProfilePage extends Component<ProfilePageProps, {}> {
  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  render() {
    const { isConnected, currentUser, usersOnline } = this.props;

    if (!currentUser) {
      return null;
    }

    const { username, email, firstName, lastName } = currentUser;

    return (
      <main className='profile-page-container'>
        <Header
          currentUsername={currentUser && currentUser.username}
          avatar={currentUser && currentUser.avatar}
          serverUrl={this.zGamesApi.SERVER_URL}
          signUp={this.zGamesApi.register}
          signIn={this.zGamesApi.login}
          logOut={this.zGamesApi.logout}
          usersOnline={usersOnline}
        />

        <div className='profile-page-content'>
          <div className='profile-page-data'>
            <Typography variant='h5'>
              {username}
            </Typography>

            <Typography>
              {email}
            </Typography>

            <Typography>
              {`${firstName} ${lastName}`}
            </Typography>
          </div>
        </div>

        <Loading isConnected={isConnected} />
      </main>
    );
  }
}

const mapStateToProps = (state: { users: types.UsersState, games: types.GamesState }) => {
  return {
    usersOnline: state.users.usersOnline,
    isConnected: state.users.isConnected,
    currentUser: state.users.currentUser,
    allGames: state.games.allGames,
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePage);
