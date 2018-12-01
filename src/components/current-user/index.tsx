import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Button, Avatar } from '@material-ui/core';

export const CurrentUser = ({ currentUsername, onLogOutClick }) => {
  const handleLogOutClick = () => {
    onLogOutClick();
  };

  return (
    <div>
      <Avatar>
        {currentUsername[0]}
      </Avatar>
      <Button variant='contained' onClick={handleLogOutClick}>Log out</Button>
    </div>
  );
};

CurrentUser.propTypes = {
  currentUsername: PropTypes.string,
  onLogOutClick: PropTypes.func.isRequired,
}
