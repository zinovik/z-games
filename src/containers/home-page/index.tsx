import React, { Component, Props } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/header';
import { ZGamesApi } from '../../services';
import * as types from '../../constants';
import './index.css';

interface HomePageProps extends Props<{}> {
  currentUser: types.User,
  isConnected: boolean,
  allGames: types.Game[],
  usersOnline: types.User[],
}

class HomePage extends Component<HomePageProps, {}> {
  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  render() {
    const { isConnected, currentUser } = this.props;

    return (
      <main className='home-page-container'>
        <Header
          isConnected={isConnected}
          currentUsername={currentUser && currentUser.username}
          signUp={this.zGamesApi.register}
          signIn={this.zGamesApi.login}
          logOut={this.zGamesApi.logout}
        />
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
