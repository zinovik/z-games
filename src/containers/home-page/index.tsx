import React, { Component, Props } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import Header from '../../components/header';
import { Loading } from '../../components';
import { ZGamesApi } from '../../services';
import * as types from '../../constants';
import './index.css';

interface IHomePageProps extends Props<{}> {
  currentUser: types.IUser,
  isConnected: boolean,
  allGames: types.IGame[],
  usersOnline: types.IUser[],
  match: { params: { token: string } },
  serverUrl: string,
}

class HomePage extends Component<IHomePageProps, {}> {
  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  constructor(props: IHomePageProps) {
    super(props);

    const { match: { params: { token } } } = props;

    if (token && token.length >= 50) {
      this.zGamesApi.setToken(token);
    }
  }

  render() {
    const { isConnected, currentUser, usersOnline, serverUrl } = this.props;

    return (
      <main className='home-page-container'>
        <Header
          currentUsername={currentUser && currentUser.username}
          avatar={currentUser && currentUser.avatar}
          serverUrl={serverUrl}
          signUp={this.zGamesApi.register}
          signIn={this.zGamesApi.login}
          logOut={this.zGamesApi.logout}
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

        <Loading isConnected={isConnected} />
      </main>
    );
  }
}

const mapStateToProps = (state: { users: types.IUsersState, games: types.IGamesState, server: types.IServerState }) => {
  return {
    usersOnline: state.users.usersOnline,
    isConnected: state.users.isConnected,
    currentUser: state.users.currentUser,
    allGames: state.games.allGames,
    serverUrl: state.server.serverUrl,
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
