import React, { Fragment } from 'react';
import { array, string } from 'prop-types';
import { NO_THANKS, NoThanksPlayer } from 'z-games-no-thanks';
import { PERUDO, PerudoPlayer } from 'z-games-perudo';

import { GamePlayer } from '../../components';
import * as types from '../../constants';

import './index.scss';

GamePlayers.propTypes = {
  gameName: string.isRequired,
  currentUserId: string.isRequired,
  playersInGame: array.isRequired,
  players: array.isRequired,
  nextPlayers: array.isRequired,
}

GamePlayers.defaultProps = {
  gameName: '',
  currentUserId: 'user-id',
  playersInGame: [],
  players: [],
  nextPlayers: [],
}

export function GamePlayers({ gameName, currentUserId, playersInGame, players, nextPlayers }: {
  gameName: string,
  currentUserId: string,
  playersInGame: types.GamePlayer[],
  players: types.IUser[],
  nextPlayers: types.IUser[],
}) {
  let playerNumber;

  playersInGame.forEach((player, index) => {
    if (player.id === currentUserId) {
      playerNumber = index;
    }
  });

  const playersCopy = playersInGame.slice();
  const playersBefore = playersCopy.splice(0, playerNumber);

  return (
    <div className='game-players-container'>
      {[...playersCopy, ...playersBefore].map((playerInGame: types.GamePlayer, index) => (
        <Fragment key={index}>
          {playerInGame.id !== currentUserId && <Fragment key={index}>

            {gameName === NO_THANKS && <GamePlayer
              gameName={gameName}
              username={players.find(player => player.id === playerInGame.id)!.username}
              avatar={players.find(player => player.id === playerInGame.id)!.avatar}
              cards={(playerInGame as NoThanksPlayer).cards || []}
              dicesCount={0}
              active={nextPlayers.some(nextPlayer => nextPlayer.id === playerInGame.id)}
            />}

            {gameName === PERUDO && <GamePlayer
              gameName={gameName}
              username={players.find(player => player.id === playerInGame.id)!.username}
              avatar={players.find(player => player.id === playerInGame.id)!.avatar}
              cards={[]}
              dicesCount={(playerInGame as PerudoPlayer).dicesCount || 0}
              active={nextPlayers.some(nextPlayer => nextPlayer.id === playerInGame.id)}
            />}

          </Fragment>}
        </Fragment>
      ))}
    </div>
  );
}
