import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';

export const Log = ({ type, createdAt, username, text }: { type: string, createdAt: Date, username: string, text?: string }) => {
  return (
    <div>
      {type === 'move' ? <span>{username} </span> : <span>{username}: </span>}
      <span>{type} </span>
      <span>({moment(createdAt).fromNow()})</span>
    </div>
  );
}

Log.propTypes = {
  type: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  text: PropTypes.string,
}
