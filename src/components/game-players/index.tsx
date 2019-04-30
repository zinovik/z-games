import React, { Fragment } from 'react';
import { array, string, object } from 'prop-types';

import { GamePlayer } from '../../components/game-player';
import { IUser, IGame, GamePlayerType } from '../../interfaces';

import './index.scss';

export function GamePlayers({ game, currentUserId, gamePlayers, players, nextPlayers }: {
  game: IGame;
  currentUserId: string;
  gamePlayers: GamePlayerType[];
  players: IUser[];
  nextPlayers: IUser[];
}) {
  let playerNumber;

  gamePlayers.forEach((player, index) => {
    if (player.id === currentUserId) {
      playerNumber = index;
    }
  });

  // Change players order to be make current player the last player
  const playersCopy = gamePlayers.slice();
  const playersBeforeCurrent = playersCopy.splice(0, playerNumber);
  const playersWithNewOrder = [...playersCopy, ...playersBeforeCurrent];

  return (
    <div className='game-players-container'>

      {playersWithNewOrder.map((playerInGame, index) => (

        <Fragment key={index}>

          {playerInGame.id !== currentUserId && players.find(player => player.id === playerInGame.id) && (

            <GamePlayer
              game={game}
              username={players.find(player => player.id === playerInGame.id)!.username}
              avatar={players.find(player => player.id === playerInGame.id)!.avatar}
              active={nextPlayers.some(nextPlayer => nextPlayer.id === playerInGame.id)}
              gamePlayer={playerInGame}
            />

          )}

        </Fragment>

      ))}
    </div>
  );
}

GamePlayers.propTypes = {
  game: object.isRequired,
  currentUserId: string.isRequired,
  gamePlayers: array.isRequired,
  players: array.isRequired,
  nextPlayers: array.isRequired,
};

GamePlayers.defaultProps = {
  game: {},
  currentUserId: '',
  gamePlayers: [],
  players: [],
  nextPlayers: [],
};
