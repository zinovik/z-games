import * as React from 'react';
import * as PropTypes from 'prop-types';

import * as types from '../../constants';

export const GameInfo = ({ game, leave, ready, start }: { game: types.Game, leave: any, ready: any, start: any }) => {
  const gameStatus = (game.gameInfo.started ? ((game.gameInfo.finished) ? 'finished' : 'started') : 'not started');

  return (
    <div>
      <div>
        {game.name}
      </div>
      <div>
        {gameStatus}
      </div>
      <div>
        <button onClick={leave}>Leave</button>
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
      <div>
        <button onClick={ready}>Ready</button>
        <button onClick={start}>Start</button>
      </div>
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
