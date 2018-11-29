import * as React from 'react';
import * as PropTypes from 'prop-types';

import * as types from '../../constants';

interface Result {
  username: string;
  place: number,

  cards: number[],
  chips: number,
  points: number,

  dicesCount: number,
}

export const GameResults = ({ game, players, playersInGame }: { game: string, players: types.User[], playersInGame: types.PlayerInGame[] }) => {

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
          {result.place} place - {result.username}
          {game === types.NO_THANKS && <span>({result.points} points)</span>}
          {game === types.PERUDO && result.dicesCount ? <span>(dices remaining: {result.dicesCount})</span> : ''}
        </div>
      ))}
    </div>
  );
}

GameResults.propTypes = {
  game: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
  playersInGame: PropTypes.array.isRequired,
}
