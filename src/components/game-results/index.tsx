import React from 'react';
import { string, array } from 'prop-types';
import { Typography } from '@material-ui/core';
import { NoThanksPlayer } from 'z-games-no-thanks';
import { PERUDO, PerudoPlayer } from 'z-games-perudo';

import { GamePlayer } from '../../components'
import { IUser, IPlayerResult, GamePlayerType } from '../../interfaces';

import './index.scss';

export function GameResults({ gameName, players, playersInGame }: {
  gameName: string,
  players: IUser[],
  playersInGame: GamePlayerType[],
}) {
  const results: IPlayerResult[] = playersInGame.map(playerInGame => {
    const currentUser = players.find(player => player.id === playerInGame.id);

    if (gameName === PERUDO) {
      return {
        username: currentUser!.username,
        avatar: currentUser!.avatar,
        place: playerInGame.place,
        dicesCount: (playerInGame as PerudoPlayer).dicesCount || 0,
        points: 0,
      };
    }

    return {
      username: currentUser!.username,
      avatar: currentUser!.avatar,
      place: playerInGame.place,
      cards: (playerInGame as NoThanksPlayer).cards || [],
      chips: (playerInGame as NoThanksPlayer).chips || 0,
      points: (playerInGame as NoThanksPlayer).points || 0,
    };
  });

  results.sort((a, b) => (a.place === b.place ? a.points - b.points : a.place - b.place));

  return (
    <div className='game-results-container'>
      {results.map((result, index) => (
        <div key={`result${index}`} className='game-results-player'>

          <Typography>
            {result.place} place
          </Typography>

          <GamePlayer
            gameName={gameName}
            username={result.username}
            avatar={result.avatar}
            gamePlayer={result as unknown as GamePlayerType}
          />

        </div>
      ))}
    </div>
  );
}

GameResults.propTypes = {
  gameName: string.isRequired,
  players: array.isRequired,
  playersInGame: array.isRequired,
}

GameResults.defaultProps = {
  gameName: 'game-name',
  players: [],
  playersInGame: [],
}
