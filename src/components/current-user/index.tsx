import React, { Component, Props, MouseEvent } from 'react';
import { string, func } from 'prop-types';
import { Avatar, Menu, MenuItem } from '@material-ui/core';

import './index.css';

interface CurrentUserProps extends Props<{}> {
  currentUsername: string,
  onLogOutClick: () => void,
}

interface CurrentUserState extends Props<{}> {
  isMenuShow: boolean,
  anchorEl: HTMLElement | null,
}

export class CurrentUser extends Component<CurrentUserProps, CurrentUserState> {

  static propTypes = {
    currentUsername: string,
    onLogOutClick: func.isRequired,
  }

  static defaultProps = {
    currentUsername: 'username',
    onLogOutClick: () => console.log,
  }

  public state = {
    isMenuShow: false,
    anchorEl: null,
  };

  handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget, isMenuShow: true });

  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null, isMenuShow: false });
  };

  handleLogOutClick = () => {
    const { onLogOutClick } = this.props;
    onLogOutClick();
  };

  render() {
    const { currentUsername } = this.props;
    const { anchorEl, isMenuShow } = this.state;

    return (
      <Avatar onClick={this.handleMenuOpen} className='current-user-avatar'>
        {currentUsername[0]}

        <Menu
          anchorEl={anchorEl}
          open={isMenuShow}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleLogOutClick}>Log out</MenuItem>
        </Menu>
      </Avatar>
    );
  }
}
