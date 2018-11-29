import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import * as types from '../../constants';

export const GameInfo = ({ game, leave, close, ready, start }: { game: types.Game, leave: any, close: any, ready: any, start: any }) => {
  const gameState = (game.state ? (game.state > 1 ? 'finished' : 'started') : 'not started');
  const { players: playersInGame } = JSON.parse(game.gameData);

  return (
    <div>
      <div>
        Game name: {game.name}
      </div>
      <div>
        Game status: {gameState}
      </div>
      {!game.state && <div>
        <Button variant='contained' color='primary' onClick={leave}>Leave</Button>
      </div>}
      <div>
        <Button variant='contained' color='primary' onClick={close}>Close</Button>
      </div>

      {!game.state && <div>
        <div>
          Players: {playersInGame.map((playerInGame, index) => (
            <span key={index}>
              {game.players.find(player => player.id === playerInGame.id)!.username}:
              {playerInGame.ready ? 'ready' : 'not ready'},
            </span>
          ))}
        </div>
        <div>
          Minimum players in this game: {game.playersMin}
        </div>
        <div>
          Maximum players in this game: {game.playersMax}
        </div>
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
  close: PropTypes.func.isRequired,
  ready: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
}
