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

function HomePagePure({ isConnected, match: { params: { token } }, history }: {
  currentUser: types.IUser,
  isConnected: boolean,
  usersOnline: types.IUsersOnline,
  match: { params: { token: string } },
  history: History,
}) {
  if (token && token.length >= 50) {
    localStorage.setItem('token', token);
    zGamesApi.updateToken();
    history.push('/games');
  }

  return (
    <main className='home-page-container'>
      <Header />

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

const mapStateToProps = (state: { users: types.IUsersState, games: types.IGamesState }) => ({
  isConnected: state.users.isConnected,
});

const mapDispatchToProps = () => ({
});

export const HomePage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePagePure) as ComponentType<any>);
