import React from 'react';
import { connect } from 'react-redux';

import { Header, NewGame, GamesList } from '../../components';
import { IUser, IGame, IUsersState, IGamesState } from '../../interfaces';

import './index.scss';

function GamesPagePure({ currentUser, allGames }: {
  currentUser: IUser,
  allGames: IGame[],
}) {
  return (
    <main className='games-page-container'>
      <Header />

      {currentUser && <NewGame />}

      <GamesList
        allGames={allGames}
        currentUsername={currentUser && currentUser.username}
      />
    </main>
  );
}

const mapStateToProps = (state: { users: IUsersState, games: IGamesState }) => ({
  currentUser: state.users.currentUser,
  allGames: state.games.allGames,
});

const mapDispatchToProps = () => ({
});

export const GamesPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamesPagePure);
