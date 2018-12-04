import React from 'react';
import { string } from 'prop-types';
import moment from 'moment';
import { Typography } from '@material-ui/core';

Log.propTypes = {
  type: string.isRequired,
  createdAt: string.isRequired,
  username: string.isRequired,
  text: string,
}

Log.defaultProps = {
  type: 'default',
  createdAt: Date().toString(),
  username: Date().toString(),
  text: 'default',
}

export function Log({ type, createdAt, username, text }: { type: string, createdAt: Date, username: string, text?: string }) {
  return (
    <Typography>
      <span>{moment(createdAt).calendar()}: </span>

      {type === 'message' && <span>{username}: {text}</span>}

      {(type === 'connect' ||
        type === 'disconnect') && <span>{username} {type}ed</span>}

      {(type === 'join' ||
        type === 'start' ||
        type === 'open') && <span>{username} {type}ed the game</span>}
      {(type === 'create' ||
        type === 'close' ||
        type === 'leave') && <span>{username} {type}d the game</span>}

      {type === 'ready' && <span>{username} updated his ready status</span>}

      {type === 'watch' && <span>{username} started to watch the game</span>}

      {type === 'move' && <span>{username} made a move</span>}

      {type === 'finish' && <span>The game has been finished</span>}
    </Typography>
  );
}
