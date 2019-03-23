import React from 'react';
import { connect } from 'react-redux';

import { Header, NewGame, GamesList, Loading } from '../../components';
import { newGame } from '../../services';
import * as types from '../../constants';
import './index.scss';

function GamesPagePure({ currentUser, isConnected, usersOnline, allGames }: {
  currentUser: types.IUser,
  isConnected: boolean,
  usersOnline: types.IUsersOnline,
  allGames: types.IGame[],
}) {
  return (
    <main className='games-page-container'>
      <Header
        currentUsername={currentUser && currentUser.username}
        avatar={currentUser && currentUser.avatar}
        usersOnline={usersOnline}
      />

      {currentUser && <NewGame newGame={newGame} />}

      <GamesList
        allGames={allGames}
        currentUsername={currentUser && currentUser.username}
      />

      <Loading isConnected={isConnected} text='Connecting to the server...' />
    </main>
  );
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

export const GamesPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamesPagePure);
