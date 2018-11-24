import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import * as types from '../../constants';

export const Game = ({ game, currentUsername, index, join }: { game: types.Game, currentUsername: string | null, index: number, join: any }) => {
  const gameState = (game.state ? ((game.state === 1) ? 'started' : 'finished') : 'not started');

  let label = !game.state ? 'Join' : 'Watch';
  game.players.forEach((player) => {
    if (player.username === currentUsername) {
      label = 'Open';
    }
  });

  return (
    <div>
      {index} - {game.name} - {gameState} - {game.players.length} - {currentUsername && <Button variant='contained' color='primary' onClick={join}>{label}</Button>}
    </div>
  );
}

Game.propTypes = {
  game: PropTypes.object.isRequired,
  currentUsername: PropTypes.string,
  index: PropTypes.number.isRequired,
  join: PropTypes.func.isRequired,
}
