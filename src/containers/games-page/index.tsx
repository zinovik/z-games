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
} from '../../actions';
import { IUser, IGame, IState } from '../../interfaces';

import './index.scss';

function GamesPagePure({ currentUser, allGames, isButtonsDisabled, newGame, joinGame, openGame, watchGame }: {
  currentUser: IUser,
  allGames: IGame[],
  isButtonsDisabled: boolean,
  newGame: (gameName: string) => void,
	joinGame: (gameNumber: number) => void,
	openGame: (gameNumber: number) => void,
	watchGame: (gameNumber: number) => void,
}) {
  return (
    <main className='games-page-container'>
      <Header />

      {currentUser && <NewGame newGame={newGame} />}

      <GamesList
        allGames={allGames}
        currentUsername={currentUser && currentUser.username}
        isButtonsDisabled={isButtonsDisabled}
        joinGame={joinGame}
        openGame={openGame}
        watchGame={watchGame}
      />
    </main>
  );
}

const mapStateToProps = (state: IState) => ({
  currentUser: state.users.currentUser,
  allGames: state.games.allGames,
  isButtonsDisabled: state.users.isButtonsDisabled,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  newGame: bindActionCreators(newGameWithoutDispatch, dispatch),
  joinGame: bindActionCreators(joinGameWithoutDispatch, dispatch),
	openGame: bindActionCreators(openGameWithoutDispatch, dispatch),
	watchGame: bindActionCreators(watchGameWithoutDispatch, dispatch),
});

export const GamesPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamesPagePure as ComponentType<any>);
