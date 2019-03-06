import React, { Fragment } from 'react';
import { array, number, bool } from 'prop-types';

import { PerudoLastRoundResult } from '../../components';
import * as types from '../../constants';

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
  playersInGame: types.PlayerInGame[],
  players: types.User[],
  lastRoundFigure: number,
  isLastRoundMaputo: boolean,
}) {
  return (
    <div>
      {playersInGame.map((playerInGame: types.PlayerInGame, index: number) => (
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
