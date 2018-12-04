import React, { Fragment } from 'react';
import { array, string, bool } from 'prop-types';

import { GamePlayer } from '../../components';
import * as types from '../../constants';
import './index.css';

GamePlayers.propTypes = {
  gameName: string.isRequired,
  currentUserId: string.isRequired,
  playersInGame: array.isRequired,
  players: array.isRequired,
  nextPlayers: array.isRequired,
  results: bool,
}

GamePlayers.defaultProps = {
  gameName: '',
  currentUserId: 'user-id',
  playersInGame: [],
  players: [],
  nextPlayers: [],
  results: false,
}

export function GamePlayers({ gameName, currentUserId, playersInGame, players, nextPlayers, results }: {
  gameName: string,
  currentUserId: string,
  playersInGame: types.PlayerInGame[],
  players: types.User[],
  nextPlayers: types.User[],
  results: boolean,
}) {
  return (
    <div className='game-players-container'>
      {playersInGame.map((playerInGame: types.PlayerInGame, index: number) => (
        <Fragment key={index}>
          {playerInGame.id !== currentUserId && <Fragment key={index}>

            {!results && <GamePlayer
              gameName={gameName}
              username={players.find(player => player.id === playerInGame.id)!.username}
              cards={playerInGame.cards || []}
              dicesCount={playerInGame.dicesCount || 0}
              active={nextPlayers.some(nextPlayer => nextPlayer.id === playerInGame.id)}
            />}

            {results && <GamePlayer
              gameName={gameName}
              username={players.find(player => player.id === playerInGame.id)!.username}
              dices={playerInGame.dices}
            />}

          </Fragment>}
        </Fragment>
      ))}
    </div>
  );
}
