import React from 'react';
import { array } from 'prop-types';

import * as types from '../../constants';

export function UsersOnline({ usersOnline }: { usersOnline: types.User[] }) {
  return (
    <span>
      {usersOnline ? usersOnline.length : 0}
      {/* {usersOnline.map((userOnline, index) => (
        <span key={index}>{userOnline.username} ({userOnline.currentGames.join(', ')})</span>)
      )} */}
    </span>
  );
}

UsersOnline.propTypes = {
  usersOnline: array.isRequired,
}

UsersOnline.defaultProps = {
  usersOnline: [],
}
