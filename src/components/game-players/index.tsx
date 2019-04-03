import React, { Fragment } from 'react';
import { array, string } from 'prop-types';

import { GamePlayer } from '../../components/game-player';
import { IUser, GamePlayerType } from '../../interfaces';

import './index.scss';

export function GamePlayers({ gameName, currentUserId, gamePlayers, players, nextPlayers }: {
  gameName: string,
  currentUserId: string,
  gamePlayers: GamePlayerType[],
  players: IUser[],
  nextPlayers: IUser[],
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
              gameName={gameName}
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
};

GamePlayers.propTypes = {
  gameName: string.isRequired,
  currentUserId: string.isRequired,
  gamePlayers: array.isRequired,
  players: array.isRequired,
  nextPlayers: array.isRequired,
};

GamePlayers.defaultProps = {
  gameName: '',
  currentUserId: '',
  gamePlayers: [],
  players: [],
  nextPlayers: [],
};
