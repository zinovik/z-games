import React, { Component, Props } from 'react';
import { connect } from "react-redux";

import { NewGame, GamesList, Loading } from '../../components';
import Header from '../../components/header';
import { ZGamesApi } from '../../services';
import * as types from '../../constants';
import './index.css';

interface GamesPageProps extends Props<{}> {
  currentUser: types.User,
  isConnected: boolean,
  allGames: types.Game[],
  usersOnline: types.User[],
  serverUrl: string,
}

class GamesPage extends Component<GamesPageProps, {}> {
  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  render() {
    const { isConnected, currentUser, allGames, usersOnline, serverUrl } = this.props;

    return (
      <main className='games-page-container'>
        <Header
          currentUsername={currentUser && currentUser.username}
          avatar={currentUser && currentUser.avatar}
          serverUrl={serverUrl}
          signUp={this.zGamesApi.register}
          signIn={this.zGamesApi.login}
          logOut={this.zGamesApi.logout}
          usersOnline={usersOnline}
        />

        {currentUser && <NewGame newGame={this.zGamesApi.newGame} />}

        <GamesList
          allGames={allGames}
          currentUsername={currentUser && currentUser.username}
          joinGame={this.zGamesApi.joinGame}
          openGame={this.zGamesApi.openGame}
          watchGame={this.zGamesApi.watchGame}
        />

        <Loading isConnected={isConnected} />
      </main>
    );
  }
}

const mapStateToProps = (state: { users: types.UsersState, games: types.GamesState, server: types.ServerState }) => {
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
)(GamesPage);
