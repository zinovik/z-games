import React, { Fragment } from 'react';
import { array, number, bool } from 'prop-types';
import { PerudoPlayer } from 'z-games-perudo';

import { PerudoLastRoundResult } from '../';
import { IUser } from '../../../interfaces';

PerudoLastRoundResults.propTypes = {
  playersInGame: array.isRequired,
  players: array.isRequired,
  lastRoundFigure: number.isRequired,
  isLastRoundMaputo: bool.isRequired,
}

PerudoLastRoundResults.defaultProps = {
  playersInGame: [],
  players: [],
  lastRoundFigure: 0,
  isLastRoundMaputo: false,
}

export function PerudoLastRoundResults({ playersInGame, players, lastRoundFigure, isLastRoundMaputo }: {
  playersInGame: PerudoPlayer[],
  players: IUser[],
  lastRoundFigure: number,
  isLastRoundMaputo: boolean,
}) {
  return (
    <div>
      {playersInGame.map((playerInGame, index) => (
        <Fragment key={index}>

          <PerudoLastRoundResult
            username={players.find(player => player.id === playerInGame.id)!.username}
            avatar={players.find(player => player.id === playerInGame.id)!.avatar}
            dices={playerInGame.dices}
            lastRoundFigure={lastRoundFigure}
            isLastRoundMaputo={isLastRoundMaputo}
          />

        </Fragment>
      ))}
    </div>
  );
}
