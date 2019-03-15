import React from 'react';
import { string, array } from 'prop-types';
import { Typography } from '@material-ui/core';
import { NoThanksPlayer } from 'z-games-no-thanks';
import { PerudoPlayer } from 'z-games-perudo';

import { GamePlayer } from '../../components'
import * as types from '../../constants';
import './index.css';
import { NO_THANKS } from 'z-games-no-thanks';

interface IResult {
  username: string;
  avatar: string;
  place: number,

  cards: number[],
  chips: number,
  points: number,

  dicesCount: number,
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

export function GameResults({ gameName, players, playersInGame }: {
  gameName: string,
  players: types.IUser[],
  playersInGame: types.GamePlayer[],
}) {
  const results: IResult[] = playersInGame.map((playerInGame) => {
    if (gameName === NO_THANKS) {
      return {
        username: players.find(player => player.id === playerInGame.id)!.username,
        avatar: players.find(player => player.id === playerInGame.id)!.avatar,
        cards: (playerInGame as NoThanksPlayer).cards || [],
        chips: (playerInGame as NoThanksPlayer).chips || 0,
        points: (playerInGame as NoThanksPlayer).points || 0,
        place: playerInGame.place,
        dicesCount: 0,
      };
    }

    return {
      username: players.find(player => player.id === playerInGame.id)!.username,
      avatar: players.find(player => player.id === playerInGame.id)!.avatar,
      cards: [],
      chips: 0,
      points: 0,
      place: playerInGame.place,
      dicesCount: (playerInGame as PerudoPlayer).dicesCount || 0,
    };
  });

  results.sort((a, b) => (a.place === b.place ? a.points - b.points : a.place - b.place));

  return (
    <div className='game-results-container'>
      {results.map((result, index) => (
        <div key={index} className='game-results-player'>
          <Typography>
            {result.place} place
          </Typography>

          <GamePlayer
            gameName={gameName}
            username={result.username}
            avatar={result.avatar}
            cards={result.cards}
            chips={result.chips}
            points={result.points}
            dicesCount={result.dicesCount}
          />

        </div>
      ))}
    </div>
  );
}
