import React, { Fragment, MouseEvent, useState } from 'react';
import { string, func } from 'prop-types';
import { Avatar, Menu, MenuItem, Button } from '@material-ui/core';

import './index.scss';

export function CurrentUser({ currentUsername, avatar, logout }: {
  currentUsername: string;
  avatar: string;
  logout: () => void;
}) {
  const [anchorEl, setAnchorEl] = useState(null as HTMLElement | null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOutClick = async () => {
    logout();

    handleMenuClose();
  };

  return (
    <Fragment>
      <Button
        onClick={handleMenuOpen}
        aria-owns={anchorEl ? 'user-menu' : undefined}
        aria-haspopup='true'
        className='current-user-avatar'
      >

        <Avatar src={avatar}>
          {currentUsername[0]}
        </Avatar>
      </Button>

      <Menu
        id='user-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleLogOutClick}>Log out</MenuItem>
      </Menu>

    </Fragment>
  );
}

CurrentUser.propTypes = {
  currentUsername: string.isRequired,
  avatar: string.isRequired,
  logout: func.isRequired,
};

CurrentUser.defaultProps = {
  currentUsername: '',
  avatar: '',
  logout: () => null,
};
