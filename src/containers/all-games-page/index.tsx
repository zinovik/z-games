import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { Header } from '../header';
import { NewGame } from '../../components/new-game';
import { GamesList } from '../../components/games-list';
import {
  newGame as newGameWithoutDispatch,
  joinGame as joinGameWithoutDispatch,
  openGamePage as openGamePageWithoutDispatch,
  reloadGames as reloadGamesWithoutDispatch,
} from '../../actions';
import { IUser, IGame, IState, IFilterSettings } from '../../interfaces';

import './index.scss';

function AllGamesPagePure({
  currentUser,
  allGames,
  isButtonsDisabled,
  filterSettings,
  isHasMore,
  isLoadingAllGames,
  newGame,
  joinGame,
  openGamePage,
  reloadGames,
}: {
  currentUser: IUser;
  allGames: IGame[];
  isButtonsDisabled: boolean;
  filterSettings: IFilterSettings;
  isHasMore: boolean;
  isLoadingAllGames: boolean;
  newGame: (parameters: { name: string; isPrivate: boolean }) => void;
  joinGame: (gameId: string) => void;
  openGamePage: (gameNumber: string) => void;
  reloadGames: (filterSettings: IFilterSettings) => void;
}) {
  return (
    <main className="games-page-container">
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
        openGamePage={openGamePage}
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
  openGamePage: bindActionCreators(openGamePageWithoutDispatch, dispatch),
  reloadGames: bindActionCreators(reloadGamesWithoutDispatch, dispatch),
});

export const AllGamesPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllGamesPagePure as ComponentType<any>);
