import React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import { Header, Loading } from '../../components';
import * as types from '../../constants';

import './index.scss';

function ProfilePageWithoutState({ currentUser, isConnected, usersOnline }: {
  currentUser: types.IUser,
  isConnected: boolean,
  usersOnline: types.IUsersOnline,
}) {
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

const mapStateToProps = (state: { users: types.IUsersState, games: types.IGamesState }) => {
  return {
    usersOnline: state.users.usersOnline,
    isConnected: state.users.isConnected,
    currentUser: state.users.currentUser,
  };
};

const mapDispatchToProps = {
};

export const ProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePageWithoutState);
