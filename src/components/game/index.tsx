import React from 'react';
import { object, string, func } from 'prop-types';
import moment from 'moment';
import { Card, CardHeader, CardContent, Typography, IconButton, CardActions } from '@material-ui/core';
import { Gamepad, OpenInBrowser, RemoveRedEye } from '@material-ui/icons';

import * as types from '../../constants';
import './index.css';

Game.propTypes = {
  game: object.isRequired,
  currentUsername: string,
  join: func.isRequired,
  open: func.isRequired,
  watch: func.isRequired,
}

Game.defaultProps = {
  game: {},
  currentUsername: undefined,
  join: () => console.log,
  open: () => console.log,
  watch: () => console.log,
}

export function Game({ game, currentUsername, join, open, watch }: {
  game: types.Game,
  currentUsername: string | undefined,
  join: () => void,
  open: () => void,
  watch: () => void
}) {
  const isAbleToJoin = !game.state && game.players.length < game.playersMax && !game.players.some(player => player.username === currentUsername);
  const isAbleToOpen = game.players.some(player => player.username === currentUsername);
  const isAbleToWatch = game.state > types.GAME_NOT_STARTED && !game.players.some(player => player.username === currentUsername);

  return (
    <Card className='game-card'>
      <CardHeader
        title={`${game.name} (${game.number})`}
        subheader={moment(game.createdAt).fromNow()}
      />

      <div className='game-logo'>
        <img src={types.GAMES_LOGOS[game.name]} />
      </div>

      <CardContent>
        <Typography>
          {game.players.length} {game.players.length === 1 ? 'player' : 'players'}
        </Typography>
        <Typography>
          {game.state === types.GAME_NOT_STARTED && <span className='game-dot game-green-dot' />}
          {game.state === types.GAME_STARTED && <span className='game-dot game-yellow-dot' />}
          {game.state === types.GAME_FINISHED && <span className='game-dot game-red-dot' />}
          {types.GAME_STATE_LABEL[game.state]}
        </Typography>
      </CardContent>

      {currentUsername && <CardActions>
        {isAbleToJoin && <IconButton onClick={join} >
          <Gamepad />
        </IconButton>}
        {isAbleToOpen && <IconButton onClick={open} >
          <OpenInBrowser />
        </IconButton>}
        {isAbleToWatch && <IconButton onClick={watch} >
          <RemoveRedEye />
        </IconButton>}
      </CardActions>}
    </Card>
  );
}
