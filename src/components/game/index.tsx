import * as React from 'react';
import * as PropTypes from 'prop-types';

import * as types from '../../constants';

export const Game = ({ game, currentUsername, index, join }: { game: types.Game, currentUsername: string | null, index: number, join: any }) => {
  const gameStatus = (game.gameInfo.started ? ((game.gameInfo.finished) ? 'finished' : 'started') : 'not started');

  return (
    <div>
      {index} - {game.name} - {gameStatus} - {game.players.length} - {currentUsername && <button onClick={join}>Join</button>}
    </div>
  );
}

Game.propTypes = {
  game: PropTypes.object.isRequired,
  currentUsername: PropTypes.string,
  index: PropTypes.number.isRequired,
  join: PropTypes.func.isRequired,
}
