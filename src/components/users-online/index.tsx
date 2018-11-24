import * as React from 'react';
import * as PropTypes from 'prop-types';

import * as types from '../../constants';

export const UsersOnline = ({ usersOnline }: { usersOnline: types.User[] }) => {
  return (
    <div>
      {usersOnline.map((userOnline, index) => (
        <span key={index}>{userOnline.username} ({userOnline.currentGames.join(', ')})</span>)
      )}
    </div>
  );
}

UsersOnline.propTypes = {
  usersOnline: PropTypes.array.isRequired,
}
