import React from 'react';
import { array } from 'prop-types';

import * as types from '../../constants';

UsersOnline.propTypes = {
  usersOnline: array.isRequired,
}

UsersOnline.defaultProps = {
  usersOnline: [],
}

export function UsersOnline({ usersOnline }: { usersOnline: types.User[] }) {
  return (
    <div>
      {usersOnline.map((userOnline, index) => (
        <span key={index}>{userOnline.username} ({userOnline.currentGames.join(', ')})</span>)
      )}
    </div>
  );
}
