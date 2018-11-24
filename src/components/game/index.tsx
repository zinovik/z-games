import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import * as types from '../../constants';

export const Game = ({ game, currentUsername, join, open, watch }: { game: types.Game, currentUsername: string | null, join: any, open: any, watch: any }) => {
  const gameState = (game.state ? ((game.state === 1) ? 'started' : 'finished') : 'not started');

  const isAbleToJoin = !game.state && game.players.length < game.playersMax && !game.players.some(player => player.username === currentUsername);
  const isAbleToOpen = game.players.some(player => player.username === currentUsername);
  const isAbleToWatch = game.state > 0 && !game.players.some(player => player.username === currentUsername);

  return (
    <div>
      <span>
        {game.number}
      </span>
      <span>
        {game.name}
      </span>
      <span>
        {gameState}
      </span>
      <span>
        {game.players.length}
      </span>
      {currentUsername && <span>
        {isAbleToJoin && <Button variant='contained' color='primary' onClick={join}>Join</Button>}
        {isAbleToOpen && <Button variant='contained' color='primary' onClick={open}>Open</Button>}
        {isAbleToWatch && <Button variant='contained' color='primary' onClick={watch}>Watch</Button>}
      </span>}
    </div>
  );
}

Game.propTypes = {
  game: PropTypes.object.isRequired,
  currentUsername: PropTypes.string,
  join: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
}
