import React, { ComponentType } from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import { Header, Loading } from '../../components';
import { ZGamesApi } from '../../services';
import * as types from '../../constants';
import './index.scss';

const zGamesApi = ZGamesApi.Instance;

function HomePagePure({ currentUser, isConnected, usersOnline, match: { params: { token } }, history }: {
  currentUser: types.IUser,
  isConnected: boolean,
  usersOnline: types.IUsersOnline,
  match: { params: { token: string } },
  history: History,
}) {
  if (token && token.length >= 50) {
    zGamesApi.setToken(token);
    history.push('/games');
  }

  return (
    <main className='home-page-container'>
      <Header
        currentUsername={currentUser && currentUser.username}
        avatar={currentUser && currentUser.avatar}
        usersOnline={usersOnline}
      />

      <div className='home-page-content'>
        <div className='home-page-logo-container'>
          <Typography>
            <img className='logo' src='/images/logo.png' />
          </Typography>

          <Typography variant='h5' color='primary'>
            a tiny board games portal
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

export const HomePage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePagePure) as ComponentType<any>);
