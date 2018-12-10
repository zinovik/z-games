import React, { Component, Props, MouseEvent } from 'react';
import { string, func } from 'prop-types';
import { Avatar, Menu, MenuItem, Button } from '@material-ui/core';

import './index.css';

interface CurrentUserProps extends Props<{}> {
  currentUsername: string,
  onLogOutClick: () => void,
}

interface CurrentUserState extends Props<{}> {
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
    anchorEl: null,
  };

  handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogOutClick = () => {
    const { onLogOutClick } = this.props;

    onLogOutClick();

    this.handleMenuClose();
  };

  render() {
    const { currentUsername } = this.props;
    const { anchorEl } = this.state;

    return (
      <Avatar>

        <Button
          onClick={this.handleMenuOpen}
          aria-owns={anchorEl ? 'user-menu' : undefined}
          className='current-user-avatar'
        >
          {currentUsername[0]}
        </Button>

        <Menu
          id='user-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleLogOutClick}>Log out</MenuItem>
        </Menu>

      </Avatar>
    );
  }
}
