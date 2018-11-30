import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
import { Card, CardHeader, CardContent, Typography, IconButton, CardActions } from '@material-ui/core';
import { Gamepad, OpenInBrowser, RemoveRedEye } from '@material-ui/icons';

import * as types from '../../constants';
import './index.css';

const GAMES_LOGOS: any = {
  [types.NO_THANKS]: '/images/no-thanks.png',
  [types.PERUDO]: '/images/perudo.png',
};

export const Game = ({ game, currentUsername, join, open, watch }: { game: types.Game, currentUsername: string | null, join: any, open: any, watch: any }) => {
  const gameState = (game.state ? (game.state > 1 ? 'finished' : 'started') : 'not started');

  const isAbleToJoin = !game.state && game.players.length < game.playersMax && !game.players.some(player => player.username === currentUsername);
  const isAbleToOpen = game.players.some(player => player.username === currentUsername);
  const isAbleToWatch = game.state > 0 && !game.players.some(player => player.username === currentUsername);

  return (
    <Card className='game-card'>
      <CardHeader
        title={`${game.name} (${game.number})`}
        subheader={moment(game.createdAt).fromNow()}
      />

      <div className='game-logo'>
        <img src={GAMES_LOGOS[game.name]} />
      </div>

      <CardContent>
        <Typography>
          Players: {game.players.length}
        </Typography>
        <Typography>
          {gameState}
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

Game.propTypes = {
  game: PropTypes.object.isRequired,
  currentUsername: PropTypes.string,
  join: PropTypes.func.isRequired,
  open: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
}
