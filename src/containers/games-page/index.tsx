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
  updateFilterSettings as updateFilterSettingsWithoutDispatch,
} from '../../actions';
import { IUser, IGame, IState, IFilterSettings } from '../../interfaces';

import './index.scss';

function GamesPagePure({ currentUser, allGames, isButtonsDisabled, filterSettings, newGame, joinGame, openGame, watchGame, updateFilterSettings }: {
  currentUser: IUser,
  allGames: IGame[],
  isButtonsDisabled: boolean,
  filterSettings: IFilterSettings,
  newGame: (gameName: string) => void,
  joinGame: (gameNumber: number) => void,
  openGame: (gameNumber: number) => void,
  watchGame: (gameNumber: number) => void,
  updateFilterSettings: (filterSettings: IFilterSettings) => void,
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
        joinGame={joinGame}
        openGame={openGame}
        watchGame={watchGame}
        updateFilterSettings={updateFilterSettings}
      />
    </main>
  );
}

const mapStateToProps = (state: IState) => ({
  currentUser: state.users.currentUser,
  allGames: state.games.allGames,
  isButtonsDisabled: state.users.isButtonsDisabled,
  filterSettings: state.users.filterSettings,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  newGame: bindActionCreators(newGameWithoutDispatch, dispatch),
  joinGame: bindActionCreators(joinGameWithoutDispatch, dispatch),
  openGame: bindActionCreators(openGameWithoutDispatch, dispatch),
  watchGame: bindActionCreators(watchGameWithoutDispatch, dispatch),
  updateFilterSettings: bindActionCreators(updateFilterSettingsWithoutDispatch, dispatch),
});

export const GamesPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamesPagePure as ComponentType<any>);
