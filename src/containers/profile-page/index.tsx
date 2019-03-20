import React, { Component, Props } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import Header from '../../components/header';
import { Loading } from '../../components';
import * as types from '../../constants';
import './index.scss';

interface IProfilePageProps extends Props<{}> {
  currentUser: types.IUser,
  isConnected: boolean,
  allGames: types.IGame[],
  usersOnline: types.IUser[],
}

class ProfilePage extends Component<IProfilePageProps, {}> {
  render() {
    const { isConnected, currentUser, usersOnline } = this.props;

    if (!currentUser) {
      // TODO: Redirect
      return null;
    }

    const { username, email, firstName, lastName } = currentUser;

    return (
      <main className='profile-page-container'>
        <Header
          currentUsername={currentUser && currentUser.username}
          avatar={currentUser && currentUser.avatar}
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

        <Loading isConnected={isConnected} text='Connecting to the server...' />
      </main>
    );
  }
}

const mapStateToProps = (state: { users: types.IUsersState, games: types.IGamesState }) => {
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
