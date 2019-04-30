import React, { Fragment } from 'react';
import { string } from 'prop-types';
import moment from 'moment';
import { Typography } from '@material-ui/core';

import './index.scss';

export function Log({ type, createdAt, username, text }: {
  type: string;
  createdAt: Date;
  username: string;
  text?: string;
}) {
  return (
    <Typography>
      <span className='log-time'>{moment(createdAt).calendar()}: </span>

      {type === 'message' && <Fragment><span className='log-username'>{username}:</span> <span className='log-message'>{text}</span></Fragment>}

      <span className={`log-${type}`}>
        {(type === 'connect' ||
          type === 'disconnect') && <Fragment>{username} has {type}ed</Fragment>}

        {(type === 'join' ||
          type === 'start' ||
          type === 'open') && <Fragment>{username} has {type}ed the game</Fragment>}
        {(type === 'create' ||
          type === 'close' ||
          type === 'update' ||
          type === 'leave') && <Fragment>{username} has {type}d the game</Fragment>}

        {type === 'ready' && <Fragment>{username} has updated ready status</Fragment>}

        {type === 'watch' && <Fragment>{username} has started to watch the game</Fragment>}

        {type === 'move' && <Fragment>{username} has made a move</Fragment>}

        {type === 'finish' && <Fragment>The game has been finished</Fragment>}
      </span>

    </Typography>
  );
}

Log.propTypes = {
  type: string.isRequired,
  createdAt: string.isRequired,
  username: string.isRequired,
  text: string,
};

Log.defaultProps = {
  type: '',
  createdAt: Date().toString(),
  username: Date().toString(),
};
