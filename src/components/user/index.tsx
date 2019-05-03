import React from 'react';
import { string } from 'prop-types';
import { Avatar, Typography } from '@material-ui/core';

import './index.scss';

export function User({ username, avatar }: { username: string, avatar?: string }) {
  return (
    <div className='user-container'>
      <Avatar src={avatar}>
        {username[0]}
      </Avatar>

      <Typography className='user-username'>
        {username}
      </Typography>
    </div>
  );
}

User.propTypes = {
  username: string.isRequired,
  avatar: string,
};

User.defaultProps = {
  username: '',
};
