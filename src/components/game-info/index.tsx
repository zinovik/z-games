import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Button, Paper, Typography } from '@material-ui/core';

import * as types from '../../constants';

export const GameInfo = ({ game, currentUserId, leave, close, ready, start }: {
  game: types.Game,
  currentUserId: string,
  leave: () => void,
  close: () => void,
  ready: () => void,
  start: () => void,
}) => {

  const { players: playersInGame } = JSON.parse(game.gameData);

  const isAbleToStart = game.players.length >= game.playersMin && game.players.length <= game.playersMax && playersInGame.every(player => player.ready);

  return (
    <Paper>
      <Typography>
        <img src={types.GAMES_LOGOS[game.name]} />
      </Typography>
      <Typography>
        <Button variant='contained' onClick={close}>Close</Button>
        {game.state === types.GAME_NOT_STARTED && <Button variant='contained' onClick={leave}>Leave</Button>}
      </Typography>

      {!game.state && <div>
        <Button variant='contained' onClick={ready}>{playersInGame.find(playerInGame => playerInGame.id === currentUserId).ready ? 'Not Ready' : 'Ready'}</Button>
        <Button variant='contained' onClick={start} disabled={!isAbleToStart}>Start</Button>

        <Typography>
          Players:
        </Typography>
        {playersInGame.map((playerInGame, index) => (
          <Typography key={index}>
            {game.players.find(player => player.id === playerInGame.id)!.username}: {playerInGame.ready ? 'ready' : 'not ready'}
          </Typography>
        ))}
        <Typography>
          {game.playersMin} players minimum
        </Typography>
        <Typography>
          {game.playersMax} players maximum
        </Typography>
      </div>}

    </Paper>
  );
}

GameInfo.propTypes = {
  game: PropTypes.object.isRequired,
  currentUserId: PropTypes.string.isRequired,
  leave: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  ready: PropTypes.func.isRequired,
  start: PropTypes.func.isRequired,
}
