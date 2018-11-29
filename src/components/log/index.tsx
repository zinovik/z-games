import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';

export const Log = ({ type, createdAt, username, text }: { type: string, createdAt: Date, username: string, text?: string }) => {
  return (
    <div>
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

    </div>
  );
}

Log.propTypes = {
  type: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  text: PropTypes.string,
}
