import * as React from 'react';
import * as PropTypes from 'prop-types';

import * as types from '../../constants';

interface Result {
  username: string;
  cards: number[],
  chips: number,
  points: number,
  place: number,
}

export const GameResults = ({ players, playersInGame }: { players: types.Player[], playersInGame: types.PlayerInGame[] }) => {

  const results: Result[] = playersInGame.map((playerInGame, index) => {
    return {
      username: players[index].username,
      cards: playerInGame.cards || [],
      chips: playerInGame.chips || 0,
      points: playerInGame.points || 0,
      place: playerInGame.place,
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
          {result.place} place - {result.username} ({result.points} points)
        </div>
      ))}
    </div>
  );
}

GameResults.propTypes = {
  players: PropTypes.array.isRequired,
  playersInGame: PropTypes.array.isRequired,
}
