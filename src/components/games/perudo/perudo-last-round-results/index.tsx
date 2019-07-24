import React, { Fragment } from 'react';
import { array, number, bool, func, string } from 'prop-types';
import { IPerudoPlayer } from 'z-games-perudo';
import { Typography, Button } from '@material-ui/core';

import { PerudoLastRoundResult } from '../perudo-last-round-result';
import { PerudoDices } from '../perudo-dices';
import { IUser } from '../../../../interfaces';

import './index.scss';

export function PerudoLastRoundResults({
  gamePlayers,
  players,
  lastRoundDiceFigure,
  lastRoundDiceNumber,
  lastPlayerUsername,
  isLastRoundMaputo,
  hideClick,
}: {
  gamePlayers: IPerudoPlayer[];
  players: IUser[];
  lastRoundDiceFigure: number;
  lastRoundDiceNumber: number;
  lastPlayerUsername: string;
  isLastRoundMaputo: boolean;
  hideClick: () => void;
}) {
  return (
    <Fragment>
      <Typography>Last round results</Typography>

      <Typography>Last bet ({lastPlayerUsername})</Typography>
      <PerudoDices dices={Array(lastRoundDiceNumber).fill(lastRoundDiceFigure)} />

      {gamePlayers.map((gamePlayer, index) => (
        <Fragment key={index}>
          {players.find(player => player.id === gamePlayer.id) && (
            <PerudoLastRoundResult
              gamePlayer={gamePlayer}
              username={players.find(player => player.id === gamePlayer.id)!.username}
              avatar={players.find(player => player.id === gamePlayer.id)!.avatar}
              lastRoundDiceFigure={lastRoundDiceFigure}
              isLastRoundMaputo={isLastRoundMaputo}
            />
          )}
        </Fragment>
      ))}

      <Button variant="contained" color="primary" className="perudo-last-round-results-button" onClick={hideClick}>
        Hide Results
      </Button>
    </Fragment>
  );
}

PerudoLastRoundResults.propTypes = {
  gamePlayer: array.isRequired,
  players: array.isRequired,
  lastRoundDiceFigure: number.isRequired,
  lastRoundDiceNumber: number.isRequired,
  lastPlayerUsername: string.isRequired,
  isLastRoundMaputo: bool.isRequired,
  hideClick: func.isRequired,
};

PerudoLastRoundResults.defaultProps = {
  gamePlayer: [],
  players: [],
  lastRoundDiceFigure: 0,
  lastRoundDiceNumber: 0,
  lastPlayerUsername: '',
  isLastRoundMaputo: false,
  hideClick: () => null,
};
