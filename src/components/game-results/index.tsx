import React from 'react';
import { string, array } from 'prop-types';
import { Typography } from '@material-ui/core';

import { NoThanksCardsList, NoThanksChips } from '../../components'
import * as types from '../../constants';

interface Result {
  username: string;
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
      username: players[index].username,
      cards: playerInGame.cards || [],
      chips: playerInGame.chips || 0,
      points: playerInGame.points || 0,
      place: playerInGame.place,
      dicesCount: playerInGame.dicesCount || 0,
    };
  });

  results.sort((a, b) => {
    if (a.place === b.place) {
      return a.points - b.points;
    }
    return a.place - b.place;
  });

  return (
    <div>
      {results.map((result, index) => (
        <div key={index}>
          <Typography>{result.place} place - {result.username}</Typography>

          {gameName === types.NO_THANKS && <div>
            <Typography>Points: {result.points}</Typography>
            <Typography><NoThanksCardsList cards={result.cards} /></Typography>
            <Typography>
              <NoThanksChips chips={result.chips} />
            </Typography>
          </div>}

          {gameName === types.PERUDO && result.dicesCount ? <Typography>{result.dicesCount} dices remained</Typography> : ''}

        </div>
      ))}
    </div>
  );
}
