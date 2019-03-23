import React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import { Header, Loading } from '../../components';
import * as types from '../../constants';

import './index.scss';

function AboutPageWithoutState({ currentUser, isConnected, usersOnline }: {
  currentUser: types.IUser,
  isConnected: boolean,
  usersOnline: types.IUsersOnline,
}) {
  return (
    <main className='about-page-container'>
      <Header
        currentUsername={currentUser && currentUser.username}
        avatar={currentUser && currentUser.avatar}
        usersOnline={usersOnline}
      />

      <div className='about-page-content'>
        <div className='about-page-data'>
          <Typography variant='h5'>
            Z-Games
          </Typography>

          <Typography>
            Z-Games is a tiny board games portal that is slowly being developed since the warm fall of 2017
          </Typography>

          <Typography>
            Currently, there is only two games: No, Thanks and Perudo. But we are working on it, you can help ;)
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

export const AboutPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AboutPageWithoutState);
