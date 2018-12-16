import React, { Component, Props } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import Header from '../../components/header';
import { ZGamesApi } from '../../services';
import * as types from '../../constants';
import './index.css';

interface HomePageProps extends Props<{}> {
  currentUser: types.User,
  isConnected: boolean,
  allGames: types.Game[],
  usersOnline: types.User[],
  match: { params: { token: string } },
}

class HomePage extends Component<HomePageProps, {}> {
  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  constructor(props: HomePageProps) {
    super(props);

    const { match: { params: { token } } } = props;

    if (token && token.length >= 50) {
      this.zGamesApi.setToken(token);
    }
  }

  render() {
    const { isConnected, currentUser } = this.props;

    return (
      <main className='home-page-container'>
        <Header
          isConnected={isConnected}
          currentUsername={currentUser && currentUser.username}
          avatar={currentUser && currentUser.avatar}
          serverUrl={this.zGamesApi.SERVER_URL}
          signUp={this.zGamesApi.register}
          signIn={this.zGamesApi.login}
          logOut={this.zGamesApi.logout}
        />

        <div className='home-page-content'>
          <Typography variant='h2' color='primary' gutterBottom={true}>
            Welcome to Z-Games!
          </Typography>

          <Typography variant='h3' color='primary'>
            Tiny simple board games portal
          </Typography>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state: { users: types.UsersState, games: types.GamesState }) => {
  return {
    usersOnline: state.users.usersOnline,
    connected: state.users.isConnected,
    currentUser: state.users.currentUser,
    allGames: state.games.allGames,
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
