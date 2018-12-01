import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
import { Typography } from '@material-ui/core';

export const Log = ({ type, createdAt, username, text }: { type: string, createdAt: Date, username: string, text?: string }) => {
  return (
    <div>
      <Typography>{moment(createdAt).calendar()}: </Typography>

      {type === 'message' && <Typography>{username}: {text}</Typography>}

      {(type === 'connect' ||
        type === 'disconnect') && <Typography>{username} {type}ed</Typography>}

      {(type === 'join' ||
        type === 'start' ||
        type === 'open') && <Typography>{username} {type}ed the game</Typography>}
      {(type === 'create' ||
        type === 'close' ||
        type === 'leave') && <Typography>{username} {type}d the game</Typography>}

      {type === 'ready' && <Typography>{username} updated his ready status</Typography>}

      {type === 'watch' && <Typography>{username} started to watch the game</Typography>}

      {type === 'move' && <Typography>{username} made a move</Typography>}

      {type === 'finish' && <Typography>The game has been finished</Typography>}

    </div>
  );
}

Log.propTypes = {
  type: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  text: PropTypes.string,
}
