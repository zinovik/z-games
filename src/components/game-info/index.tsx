import React, { Fragment } from 'react';
import { object, string, func } from 'prop-types';
import { Button, Typography } from '@material-ui/core';

import * as types from '../../constants';
import './index.css';

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
    <div className='game-info-container'>
      <Typography>
        <img src={types.GAMES_LOGOS[game.name]} />
      </Typography>

      <div className='game-info-players'>
        <Typography>
          Players ({game.playersMin} min, {game.playersMax} max)
        </Typography>

        {playersInGame.map((playerInGame: types.PlayerInGame, index: number) => (
          <Typography key={index}>
            {playerInGame.ready ?
              <span className='player-dot game-green-dot' /> :
              <span className='player-dot game-red-dot' />}

            {game.players.find(player => player.id === playerInGame.id)!.username}
          </Typography>
        ))}
      </div>

      <div className='game-info-buttons'>
        <Button variant='contained' onClick={close}>Close</Button>

        {game.state === types.GAME_NOT_STARTED && <Button variant='contained' onClick={leave}>Leave</Button>}

        {game.state === types.GAME_NOT_STARTED && <Fragment>
          <Button variant='contained' onClick={ready}>
            {playersInGame.find((playerInGame: types.PlayerInGame) => playerInGame.id === currentUserId).ready ? 'Not Ready' : 'Ready'}
          </Button>
          <Button variant='contained' onClick={start} disabled={!isAbleToStart}>Start</Button>
        </Fragment>}
      </div>

    </div>
  );
};
