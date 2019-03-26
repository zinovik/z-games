import React, { Fragment, MouseEvent, useState, ComponentType } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Avatar, Menu, MenuItem, Button } from '@material-ui/core';

import { ZGamesApi } from '../../services';
import { updateCurrentUser } from '../../actions';
import { IUser } from '../../interfaces';

import './index.scss';

const zGamesApi = ZGamesApi.Instance;

function CurrentUserPure({ currentUsername, avatar, updateUser }: {
  currentUsername: string,
  avatar: string,
  updateUser: (currentUser: IUser | null) => void
}) {
  const [anchorEl, setAnchorEl] = useState(null as HTMLElement | null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOutClick = async () => {
    localStorage.setItem('token', '');
    zGamesApi.updateToken();
    updateUser(null);

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

CurrentUserPure.propTypes = {
  currentUsername: string,
  avatar: string,
};

CurrentUserPure.defaultProps = {
  currentUsername: 'username',
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateUser: bindActionCreators(updateCurrentUser, dispatch),
});

export const CurrentUser = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrentUserPure as ComponentType<any>);
