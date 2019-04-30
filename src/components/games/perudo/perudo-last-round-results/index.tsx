import React, { Fragment } from 'react';
import { array, number, bool, func } from 'prop-types';
import { IPerudoPlayer } from 'z-games-perudo';
import { Typography, Button } from '@material-ui/core';

import { PerudoLastRoundResult } from '../perudo-last-round-result';
import { IUser } from '../../../../interfaces';

import './index.scss';

export function PerudoLastRoundResults({
  gamePlayers,
  players,
  lastRoundFigure,
  isLastRoundMaputo,
  hideClick,
}: {
  gamePlayers: IPerudoPlayer[];
  players: IUser[];
  lastRoundFigure: number;
  isLastRoundMaputo: boolean;
  hideClick: () => void;
}) {
  return (
    <Fragment>

      <Typography>
        Last round results
      </Typography>

      {gamePlayers.map((gamePlayer, index) => (
        <Fragment key={index}>

          {players.find(player => player.id === gamePlayer.id) && <PerudoLastRoundResult
            gamePlayer={gamePlayer}
            username={players.find(player => player.id === gamePlayer.id)!.username}
            avatar={players.find(player => player.id === gamePlayer.id)!.avatar}
            lastRoundFigure={lastRoundFigure}
            isLastRoundMaputo={isLastRoundMaputo}
          />}

        </Fragment>
      ))}

      <Button
        variant='contained'
        color='primary'
        className='perudo-last-round-results-button'
        onClick={hideClick}>
        Hide Results
      </Button>

    </Fragment>
  );
}

PerudoLastRoundResults.propTypes = {
  gamePlayer: array.isRequired,
  players: array.isRequired,
  lastRoundFigure: number.isRequired,
  isLastRoundMaputo: bool.isRequired,
  hideClick: func.isRequired,
};

PerudoLastRoundResults.defaultProps = {
  gamePlayer: [],
  players: [],
  lastRoundFigure: 0,
  isLastRoundMaputo: false,
  hideClick: () => null,
};
