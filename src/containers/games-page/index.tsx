import React from 'react';
import { connect } from 'react-redux';

import { Header, NewGame, GamesList } from '../../components';
import { IUser, IGame, IState } from '../../interfaces';

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

const mapStateToProps = (state: IState) => ({
  currentUser: state.users.currentUser,
  allGames: state.games.allGames,
});

const mapDispatchToProps = () => ({
});

export const GamesPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamesPagePure);
