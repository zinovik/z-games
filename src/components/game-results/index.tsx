import React from 'react';
import { string, array } from 'prop-types';
import { Typography } from '@material-ui/core';

import { GamePlayer } from '../../components'
import * as types from '../../constants';
import './index.css';

interface Result {
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
  players: types.User[],
  playersInGame: types.PlayerInGame[],
}) {
  const results: Result[] = playersInGame.map((playerInGame, index) => {
    return {
      username: players.find(player => player.id === playerInGame.id)!.username,
      avatar: players.find(player => player.id === playerInGame.id)!.avatar,
      cards: playerInGame.cards || [],
      chips: playerInGame.chips || 0,
      points: playerInGame.points || 0,
      place: playerInGame.place,
      dicesCount: playerInGame.dicesCount || 0,
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
