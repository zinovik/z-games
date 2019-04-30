import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { Header } from '../header';
import { NewGame } from '../../components/new-game';
import { GamesList } from '../../components/games-list';
import {
  newGame as newGameWithoutDispatch,
  joinGame as joinGameWithoutDispatch,
  openGame as openGameWithoutDispatch,
  watchGame as watchGameWithoutDispatch,
  reloadGames as reloadGamesWithoutDispatch,
} from '../../actions';
import { IUser, IGame, IState, IFilterSettings } from '../../interfaces';

import './index.scss';

function GamesPagePure({
  currentUser,
  allGames,
  isButtonsDisabled,
  filterSettings,
  isHasMore,
  isLoadingAllGames,
  newGame,
  joinGame,
  openGame,
  watchGame,
  reloadGames,
}: {
  currentUser: IUser,
  allGames: IGame[],
  isButtonsDisabled: boolean,
  filterSettings: IFilterSettings,
  isHasMore: boolean,
  isLoadingAllGames: boolean,
  newGame: (gameName: string) => void,
  joinGame: (gameId: string) => void,
  openGame: (gameId: string) => void,
  watchGame: (gameId: string) => void,
  reloadGames: (filterSettings: IFilterSettings) => void,
}) {
  return (
    <main className='games-page-container'>
      <Header />

      {currentUser && <NewGame newGame={newGame} />}

      <GamesList
        allGames={allGames}
        currentUser={currentUser}
        isButtonsDisabled={isButtonsDisabled}
        filterSettings={filterSettings}
        isHasMore={isHasMore}
        isLoadingAllGames={isLoadingAllGames}
        joinGame={joinGame}
        openGame={openGame}
        watchGame={watchGame}
        reloadGames={reloadGames}
      />
    </main>
  );
}

const mapStateToProps = (state: IState) => ({
  currentUser: state.users.currentUser,
  allGames: state.games.allGames,
  isButtonsDisabled: state.users.isButtonsDisabled,
  filterSettings: state.games.filterSettings,
  isHasMore: state.games.isHasMore,
  isLoadingAllGames: state.games.isLoadingAllGames,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  newGame: bindActionCreators(newGameWithoutDispatch, dispatch),
  joinGame: bindActionCreators(joinGameWithoutDispatch, dispatch),
  openGame: bindActionCreators(openGameWithoutDispatch, dispatch),
  watchGame: bindActionCreators(watchGameWithoutDispatch, dispatch),
  reloadGames: bindActionCreators(reloadGamesWithoutDispatch, dispatch),
});

export const GamesPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamesPagePure as ComponentType<any>);
