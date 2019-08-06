import React, { Fragment, useEffect, useState } from 'react';
import { string, object, array, bool, func } from 'prop-types';
import { GAME_NOT_STARTED, GAME_STARTED, GAME_FINISHED } from 'z-games-base-game';
import { Button, Typography } from '@material-ui/core';

import { BackToTop } from './back-to-top';
import { GamesFilter } from './games-filter';
import { Game } from './game';
import { IGame, IUser, IFilterSettings } from '../../interfaces';

import './index.scss';

const SCROLL_HEIGHT = 1300;

export function GamesList({
  allGames,
  currentUser,
  isButtonsDisabled,
  filterSettings,
  isHasMore,
  isLoadingAllGames,
  joinGame,
  openGame,
  watchGame,
  reloadGames,
}: {
  allGames: IGame[];
  currentUser?: IUser;
  isButtonsDisabled: boolean;
  filterSettings: IFilterSettings;
  isHasMore: boolean;
  isLoadingAllGames: boolean;
  joinGame: (gameId: string) => void;
  openGame: (gameId: string) => void;
  watchGame: (gameId: string) => void;
  reloadGames: (filterSettings: IFilterSettings) => void;
}) {
  const [isBackToTop, setIsBackToTop] = useState(false);
  const [isFilterShown, setIsFilterShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { isNotStarted, isStarted, isFinished, isWithMe, isWithoutMe, isMyMove, isNotMyMove, isGames } = filterSettings;

  const handleFilterButtonClick = () => {
    setIsFilterShown(!isFilterShown);
  };

  const handleScroll = () => {
    setIsBackToTop(window.pageYOffset > 100);

    if (!isHasMore || isLoadingAllGames || isLoading) {
      return;
    }

    if (window.document.body.scrollHeight - window.pageYOffset > SCROLL_HEIGHT) {
      return;
    }

    setIsLoading(true);

    reloadGames({
      ...filterSettings,
      limit: filterSettings.limit + 10,
    });
  };

  // isLoadingAllGames updates asynchronously.
  // That's why we need isLoading component state variable,
  // we use it only until isLoadingAllGames is set
  if (isLoadingAllGames && isLoading) {
    setIsLoading(false);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  // TODO: Move filter to the back-end

  return (
    <Fragment>
      {isBackToTop && <BackToTop />}

      {isFilterShown && (
        <Fragment>
          <Button onClick={handleFilterButtonClick}>Hide Filter</Button>
          <GamesFilter filterSettings={filterSettings} currentUser={currentUser} reloadGames={reloadGames} />
        </Fragment>
      )}

      {!isFilterShown && <Button onClick={handleFilterButtonClick}>Show Filter</Button>}

      <div className="games-list">
        {allGames.map(
          (game, index) =>
            ((isNotStarted && game.state === GAME_NOT_STARTED) ||
              (isStarted && game.state === GAME_STARTED) ||
              (isFinished && game.state === GAME_FINISHED)) &&
            isGames[game.name] &&
            ((isWithoutMe && (!currentUser || !game.players || !game.players.some(gamePlayer => gamePlayer.id === currentUser.id))) ||
              (isWithMe && currentUser && game.players && game.players.some(gamePlayer => gamePlayer.id === currentUser.id))) &&
            ((isNotMyMove && (!currentUser || !game.nextPlayers || !game.nextPlayers.some(gamePlayer => gamePlayer.id === currentUser.id))) ||
              (isMyMove && currentUser && game.nextPlayers && game.nextPlayers.some(gamePlayer => gamePlayer.id === currentUser.id))) && (
              <Game game={game} currentUser={currentUser} key={`game${index}`} isButtonsDisabled={isButtonsDisabled} openGame={openGame} />
            ),
        )}
      </div>
      {(isLoadingAllGames || isLoading) && (
        <div className="games-list-loading">
          <Typography variant="h1">Loading...</Typography>
        </div>
      )}
    </Fragment>
  );
}

GamesList.propTypes = {
  newMessage: string.isRequired,
  allGames: array.isRequired,
  isButtonsDisabled: bool.isRequired,
  filterSettings: object.isRequired,
  isHasMore: bool.isRequired,
  isLoadingAllGames: bool.isRequired,
  currentUser: object,
  joinGame: func.isRequired,
  openGame: func.isRequired,
  watchGame: func.isRequired,
  reloadGames: func.isRequired,
};

GamesList.defaultProps = {
  newMessage: '',
  allGames: [],
  isButtonsDisabled: false,
  filterSettings: {},
  isHasMore: false,
  isLoadingAllGames: false,
  joinGame: () => null,
  openGame: () => null,
  watchGame: () => null,
  reloadGames: () => null,
};
