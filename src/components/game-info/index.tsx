import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import * as types from '../../constants';

export const GameInfo = ({ game, leave, ready, start }: { game: types.Game, leave: any, ready: any, start: any }) => {
  const gameStatus = (game.gameInfo.started ? ((game.gameInfo.finished) ? 'finished' : 'started') : 'not started');

  return (
    <div>
      <div>
        Game name: {game.name}
      </div>
      <div>
        Game status: {gameStatus}
      </div>
      <div>
        <Button variant='contained' color='primary' onClick={leave}>Leave</Button>
      </div>
      <div>
        Players: {game.players.map((player, index) => (<span key={index}>{player.username}: {player.ready ? 'ready' : 'not ready'}, </span>))}
      </div>
      <div>
        Minimum players in this game: {game.gameInfo.PLAYERS_MIN}
      </div>
      <div>
        Maximum players in this game: {game.gameInfo.PLAYERS_MAX}
      </div>
      {!game.gameInfo.started && <div>
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
