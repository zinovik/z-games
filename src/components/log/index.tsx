import React, { Fragment } from 'react';
import { string } from 'prop-types';
import moment from 'moment';
import { Typography } from '@material-ui/core';

import './index.css';

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
      <span className='log-time'>{moment(createdAt).calendar()}: </span>

      {type === 'message' && <Fragment><span className='log-username'>{username}:</span> <span className='log-message'>{text}</span></Fragment>}

      <span className={`log-${type}`}>
        {(type === 'connect' ||
          type === 'disconnect') && <Fragment>{username} {type}ed</Fragment>}

        {(type === 'join' ||
          type === 'start' ||
          type === 'open') && <Fragment>{username} {type}ed the game</Fragment>}
        {(type === 'create' ||
          type === 'close' ||
          type === 'leave') && <Fragment>{username} {type}d the game</Fragment>}

        {type === 'ready' && <Fragment>{username} updated ready status</Fragment>}

        {type === 'watch' && <Fragment>{username} started to watch the game</Fragment>}

        {type === 'move' && <Fragment>{username} made a move</Fragment>}

        {type === 'finish' && <Fragment>The game has been finished</Fragment>}
      </span>

    </Typography>
  );
}
