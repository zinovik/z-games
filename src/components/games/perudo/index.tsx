import React, { Fragment, useState } from 'react';
import { object, bool, func } from 'prop-types';
import { Typography, Button } from '@material-ui/core';
import { IPerudoData } from 'z-games-perudo';

import { PerudoDices } from './perudo-dices';
import { PerudoMove } from './perudo-move';
import { PerudoLastRoundResults } from './perudo-last-round-results';
import { IGame, IUser } from '../../../interfaces';

import './index.scss';

export function Perudo({
  game,
  currentUser,
  isMyTurn,
  isButtonsDisabled,
  makeMove,
}: {
  game: IGame;
  currentUser: IUser;
  isMyTurn: boolean;
  isButtonsDisabled: boolean;
  makeMove: ({ gameId, move }: { gameId: string; move: string }) => void;
}) {
  const [isHideResultsClicked, setIsHideResultsClicked] = useState(false);
  const [hideResultsClickedRound, setHideResultsClickedRound] = useState(1);

  const { gameData, players } = game;

  if (!currentUser) {
    return null;
  }

  const {
    currentDiceNumber,
    currentDiceFigure,
    currentRound,
    lastPlayerId,
    isMaputoRound,
    lastRoundResults,
    lastRoundDiceFigure,
    lastRoundDiceNumber,
    isLastRoundMaputo,
    players: gamePlayers,
  }: IPerudoData = JSON.parse(gameData);

  if ((!lastRoundResults.length || currentDiceNumber || currentDiceFigure) && !isHideResultsClicked) {
    setIsHideResultsClicked(true);
  } else if (hideResultsClickedRound !== currentRound && !currentDiceNumber && !currentDiceFigure && isHideResultsClicked) {
    setIsHideResultsClicked(false);
  }

  const hideClick = () => {
    setIsHideResultsClicked(true);
    setHideResultsClickedRound(currentRound);
  };

  const lastRoundResultsClick = () => {
    setIsHideResultsClicked(false);
  };

  const currentGamePlayer = gamePlayers.find(gamePlayer => gamePlayer.id === currentUser.id);
  const lastPlayer = players.find(player => player.id === lastPlayerId);

  const isMaputoAble =
    currentGamePlayer &&
    currentGamePlayer.dices.length === 1 &&
    !currentDiceNumber &&
    !currentDiceFigure &&
    gamePlayers.filter(gamePlayer => {
      return (gamePlayer.dicesCount || 0) > 0;
    }).length > 2 &&
    gamePlayers.reduce((diceCount: number, gamePlayer) => {
      return diceCount + (gamePlayer.dicesCount || 0);
    }, 0) > 3;

  return (
    <Fragment>
      {!isHideResultsClicked && (
        <Fragment>
          <PerudoLastRoundResults
            gamePlayers={lastRoundResults}
            players={players}
            lastRoundDiceFigure={lastRoundDiceFigure}
            lastRoundDiceNumber={lastRoundDiceNumber}
            lastPlayerUsername={lastPlayer && lastPlayer.username}
            isLastRoundMaputo={isLastRoundMaputo}
            hideClick={hideClick}
          />
        </Fragment>
      )}

      {isHideResultsClicked && (
        <Fragment>
          {lastRoundResults.length > 0 && !currentDiceNumber && !currentDiceFigure && (
            <Button onClick={lastRoundResultsClick}>Show Last Round Results</Button>
          )}

          <Typography>
            Round: {currentRound} {isMaputoRound && <span>(maputo)</span>}
          </Typography>

          <div className="perudo-bets">
            {currentDiceNumber > 0 && currentDiceFigure > 0 && (
              <div className="perudo-current-bet">
                <Typography>Current bet ({lastPlayer && lastPlayer.username})</Typography>

                <PerudoDices dices={Array(currentDiceNumber).fill(currentDiceFigure)} />
              </div>
            )}

            {isMyTurn && <PerudoMove game={game} isMaputoAble={isMaputoAble} isButtonsDisabled={isButtonsDisabled} makeMove={makeMove} />}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

Perudo.propTypes = {
  game: object.isRequired,
  currentUser: object.isRequired,
  isMyTurn: bool.isRequired,
  isButtonsDisabled: bool.isRequired,
  makeMove: func.isRequired,
};

Perudo.defaultProps = {
  game: {},
  currentUser: {},
  isMyTurn: false,
  isButtonsDisabled: false,
  makeMove: () => null,
};
