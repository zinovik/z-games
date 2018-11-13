import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';

export const Message = ({ type, time, username, text }: { type: string, time: number, username: string, text: string }) => {
  return (
    <div>
      {type === 'move' ? <span>{username} </span> : <span>{username}: </span>}
      <span>{text} </span>
      <span>({moment(time).fromNow()})</span>
    </div>
  );
}

Message.propTypes = {
  type: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}
