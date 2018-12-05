import React, { Fragment } from 'react';
import { array, string } from 'prop-types';

import { PerudoLastRoundResult } from '../../components';
import * as types from '../../constants';

PerudoLastRoundResults.propTypes = {
  gameName: string.isRequired,
  currentUserId: string.isRequired,
  playersInGame: array.isRequired,
  players: array.isRequired,
  nextPlayers: array.isRequired,
}

PerudoLastRoundResults.defaultProps = {
  gameName: '',
  currentUserId: 'user-id',
  playersInGame: [],
  players: [],
  nextPlayers: [],
}

export function PerudoLastRoundResults({ gameName, currentUserId, playersInGame, players, nextPlayers }: {
  gameName: string,
  currentUserId: string,
  playersInGame: types.PlayerInGame[],
  players: types.User[],
  nextPlayers: types.User[],
}) {
  return (
    <div>
      {playersInGame.map((playerInGame: types.PlayerInGame, index: number) => (
        <Fragment key={index}>
          {playerInGame.id !== currentUserId && <Fragment key={index}>

            <PerudoLastRoundResult
              username={players.find(player => player.id === playerInGame.id)!.username}
              dices={playerInGame.dices}
            />

          </Fragment>}
        </Fragment>
      ))}
    </div>
  );
}
