import * as React from 'react';
import * as PropTypes from 'prop-types';

import * as types from '../../constants';

export const UsersOnline = ({ usersOnline }: { usersOnline: types.UserOnline[] }) => {
  return (
    <div>
      {usersOnline.map((userOnline, index) => <span key={index}>{userOnline.username} ({userOnline.openGameNumber})</span>)}
    </div>
  );
}

UsersOnline.propTypes = {
  usersOnline: PropTypes.array.isRequired,
}
