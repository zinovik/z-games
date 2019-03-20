import React, { Component, Props } from 'react';
import { connect } from "react-redux";

import { NewGame, GamesList, Loading } from '../../components';
import Header from '../../components/header';
import { ZGamesApi } from '../../services';
import * as types from '../../constants';
import './index.scss';

interface IGamesPageProps extends Props<{}> {
  currentUser: types.IUser,
  isConnected: boolean,
  allGames: types.IGame[],
  usersOnline: types.IUser[],
}

class GamesPage extends Component<IGamesPageProps, {}> {
  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  render() {
    const { isConnected, currentUser, allGames, usersOnline } = this.props;

    return (
      <main className='games-page-container'>
        <Header
          currentUsername={currentUser && currentUser.username}
          avatar={currentUser && currentUser.avatar}
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
)(GamesPage);
