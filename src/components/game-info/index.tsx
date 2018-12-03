import React from 'react';
import { object, string, func } from 'prop-types';
import { Button, Paper, Typography } from '@material-ui/core';

import * as types from '../../constants';

GameInfo.propTypes = {
  game: object.isRequired,
  currentUserId: string.isRequired,
  leave: func.isRequired,
  close: func.isRequired,
  ready: func.isRequired,
  start: func.isRequired,
}

GameInfo.defaultProps = {
  game: {},
  currentUserId: 'user-id',
  leave: () => console.log,
  close: () => console.log,
  ready: () => console.log,
  start: () => console.log,
}

export function GameInfo({ game, currentUserId, leave, close, ready, start }: {
  game: types.Game,
  currentUserId: string,
  leave: () => void,
  close: () => void,
  ready: () => void,
  start: () => void,
}) {
  const { players: playersInGame } = JSON.parse(game.gameData);

  const isAbleToStart = game.players.length >= game.playersMin
    && game.players.length <= game.playersMax
    && playersInGame.every((playerInGame: types.PlayerInGame) => playerInGame.ready);

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
        <Button variant='contained' onClick={ready}>
          {playersInGame.find((playerInGame: types.PlayerInGame) => playerInGame.id === currentUserId).ready ? 'Not Ready' : 'Ready'}
        </Button>
        <Button variant='contained' onClick={start} disabled={!isAbleToStart}>Start</Button>

        <Typography>
          Players:
        </Typography>
        {playersInGame.map((playerInGame: types.PlayerInGame, index: number) => (
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
};
