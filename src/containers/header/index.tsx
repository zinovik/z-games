import React, { useState, useEffect, ComponentType } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Badge,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { History } from 'history';

import { Authorize } from '../../components/authorize';
import { CurrentUser } from '../../components/current-user';
import { UsersOnline } from '../../components/users-online';
import {
  register as registerWithoutDispatch,
  authorize as authorizeWithoutDispatch,
  forgotPassword as forgotPasswordWithoutDispatch,
  updateCurrentUser as updateCurrentUserWithoutDispatch,
  logout as logoutWithoutDispatch,
} from '../../actions';
import { IUser, IUsersOnline, IState } from '../../interfaces';

import './index.scss';

const MENU_WIDTH_MIN = 720;

export function HeaderPure({
  serverUrl,
  currentUser,
  usersOnline,
  history,
  register,
  authorize,
  forgotPassword,
  updateCurrentUser,
  logout,
}: {
  serverUrl: string;
  currentUser: IUser;
  usersOnline: IUsersOnline;
  history: History;
  register: (serverUrl: string, username: string, password: string, email: string) => Promise<void>;
  authorize: (serverUrl: string, username: string, password: string) => Promise<void>;
  forgotPassword: (serverUrl: string, username: string) => Promise<void>;
  updateCurrentUser: (parameters: IUser) => void;
  logout: () => void;
}) {
  const [width, setWidth] = useState(0);
  const [isDrawerShown, setIsDrawerShown] = useState(false);

  const currentUsername = currentUser && currentUser.username;
  const avatar = currentUser && currentUser.avatar;

  const LINKS = currentUser
    ? ['Home', 'All Games', 'Invites', 'Rating', 'Rules', 'Profile', 'About']
    : ['Home', 'All Games', 'Rating', 'Rules', 'About'];

  const handleDrawerToggle = (): void => {
    setIsDrawerShown(!isDrawerShown);
  };

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);

    return () => window.removeEventListener('resize', updateWindowDimensions);
  });

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
  };

  const nextPath = (path: string) => {
    if (history) {
      history.push(path);
    }
  };

  const invitesCount = currentUser ? currentUser.invitesInvitee.filter(invite => !invite.isClosed).length : 0;

  return (
    <AppBar position="static">
      <Toolbar>
        <div className="header-toolbar">
          {width < MENU_WIDTH_MIN && (
            <IconButton color="inherit" aria-label="Open drawer" onClick={handleDrawerToggle}>
              <Menu />
            </IconButton>
          )}

          <div className="header-logo-container">
            <Typography>
              <Button
                key={`${LINKS[0]}1`}
                onClick={() => {
                  nextPath(`/${LINKS[0].toLowerCase().replace(' ', '-')}`);
                }}
              >
                <img className="header-logo-small" src="/images/logo-small.png" alt="header logo" />
              </Button>
            </Typography>

            <UsersOnline usersOnline={usersOnline} />
          </div>

          {width >= MENU_WIDTH_MIN && (
            <nav>
              {LINKS.map(label => (
                <Button
                  key={`${label}1`}
                  onClick={() => {
                    nextPath(`/${label.toLowerCase().replace(' ', '-')}`);
                  }}
                >
                  {label === 'Invites' && invitesCount > 0 ? (
                    <Badge badgeContent={invitesCount} color="secondary">
                      {label}
                    </Badge>
                  ) : (
                    label
                  )}
                </Button>
              ))}
            </nav>
          )}

          {!currentUsername && (
            <Authorize
              serverUrl={serverUrl}
              register={register}
              authorize={authorize}
              forgotPassword={forgotPassword}
            />
          )}

          {currentUsername && (
            <CurrentUser
              currentUsername={currentUsername}
              avatar={avatar}
              updateCurrentUser={updateCurrentUser}
              logout={logout}
            />
          )}
        </div>
      </Toolbar>

      <nav>
        <Drawer open={isDrawerShown} onClose={handleDrawerToggle}>
          <div tabIndex={0} role="button" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
            <List>
              {LINKS.map(label => (
                <ListItem button={true} key={`${label}2`}>
                  {label === 'Invites' && invitesCount > 0 ? (
                    <Badge badgeContent={invitesCount} color="secondary">
                      <ListItemText
                        primary={label}
                        onClick={() => {
                          nextPath(`/${label.toLowerCase().replace(' ', '-')}`);
                        }}
                      />
                    </Badge>
                  ) : (
                    <ListItemText
                      primary={label}
                      onClick={() => {
                        nextPath(`/${label.toLowerCase().replace(' ', '-')}`);
                      }}
                    />
                  )}
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </nav>
    </AppBar>
  );
}

const mapStateToProps = (state: IState) => ({
  serverUrl: state.users.serverUrl,
  usersOnline: state.users.usersOnline,
  currentUser: state.users.currentUser,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  register: bindActionCreators(registerWithoutDispatch, dispatch),
  authorize: bindActionCreators(authorizeWithoutDispatch, dispatch),
  forgotPassword: bindActionCreators(forgotPasswordWithoutDispatch, dispatch),
  updateCurrentUser: bindActionCreators(updateCurrentUserWithoutDispatch, dispatch),
  logout: bindActionCreators(logoutWithoutDispatch, dispatch),
});

export const Header = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderPure as ComponentType<any>) as ComponentType<any>);
