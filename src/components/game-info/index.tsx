import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import * as types from '../../constants';

export const GameInfo = ({ game, leave, ready, start }: { game: types.Game, leave: any, ready: any, start: any }) => {
  const gameState = (game.state ? ((game.state === 1) ? 'started' : 'finished') : 'not started');

  const label = game.state ? 'Close' : 'Leave';

  return (
    <div>
      <div>
        Game name: {game.name}
      </div>
      <div>
        Game status: {gameState}
      </div>
      <div>
        <Button variant='contained' color='primary' onClick={leave}>{label}</Button>
      </div>
      <div>
        Players: {game.players.map((player, index) => (<span key={index}>{player.username}: {player.ready ? 'ready' : 'not ready'}, </span>))}
      </div>
      <div>
        Minimum players in this game: {game.playersMin}
      </div>
      <div>
        Maximum players in this game: {game.playersMax}
      </div>
      {!game.state && <div>
        <Button variant='contained' color='primary' onClick={ready}>Ready</Button>
        <Button variant='contained' color='primary' onClick={start}>Start</Button>
      </div>}
    </div>
  );
}

GameInfo.propTypes = {
  game: PropTypes.object.isRequired,
  currentUsername: PropTypes.string,
  leave: PropTypes.func.isRequired,
  ready: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
}
