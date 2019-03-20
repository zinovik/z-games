import React, { Fragment, MouseEvent, useState } from 'react';
import { string } from 'prop-types';
import { Avatar, Menu, MenuItem, Button } from '@material-ui/core';

import { ZGamesApi } from '../../services';

const zGamesApi = ZGamesApi.Instance;

import './index.scss';

export function CurrentUser({ currentUsername, avatar }: {
  currentUsername: string,
  avatar: string,
}) {
  const [anchorEl, setAnchorEl] = useState(null as HTMLElement | null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOutClick = () => {
    zGamesApi.logout();

    handleMenuClose();
  };

  return <Fragment>
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

  </Fragment>;
};

CurrentUser.propTypes = {
  currentUsername: string,
  avatar: string,
};

CurrentUser.defaultProps = {
  currentUsername: 'username',
};
