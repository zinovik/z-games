import React, { useState, useEffect, ComponentType } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { History } from 'history';

import { Authorize } from '../../components/authorize';
import { CurrentUser } from '../../components/current-user';
import { UsersOnline } from '../../components/users-online';
import {
	register as registerWithoutDispatch,
	authorize as authorizeWithoutDispatch,
	logout as logoutWithoutDispatch,
} from '../../actions';
import { IUser, IUsersOnline, IState } from '../../interfaces';

import './index.scss';

const MENU_WIDTH_MIN = 600;

export function HeaderPure({ serverUrl, currentUser, usersOnline, history, register, authorize, logout }: {
	serverUrl: string,
	currentUser: IUser,
	usersOnline: IUsersOnline,
	history: History,
	register: (serverUrl: string, username: string, password: string, email: string) => Promise<void>,
	authorize: (serverUrl: string, username: string, password: string) => Promise<void>,
	logout: () => void,
}) {
	const [width, setWidth] = useState(0);
	const [isDrawerShown, setIsDrawerShown] = useState(false);

	const currentUsername = currentUser && currentUser.username;
	const avatar = currentUser && currentUser.avatar;

	const LINKS = currentUser ? ['Home', 'Games', 'Invites', 'Rating', 'Rules', 'Profile', 'About'] : ['Home', 'Games', 'Rating', 'Rules', 'About'];

	const handleDrawerToggle = (): void => {
		setIsDrawerShown(!isDrawerShown);
	};

	useEffect(() => {
		updateWindowDimensions();
		window.addEventListener('resize', updateWindowDimensions);

		return function cleanup() {
			window.removeEventListener('resize', updateWindowDimensions);
		};
	});

	const updateWindowDimensions = () => {
		setWidth(window.innerWidth);
	};

	const nextPath = (path: string) => {
		if (history) {
			history.push(path);
		}
	};

	return (
		<AppBar position='static'>
			<Toolbar>
				<div className='header-toolbar'>
					{width < MENU_WIDTH_MIN && <IconButton
						color='inherit'
						aria-label='Open drawer'
						onClick={handleDrawerToggle}
					>
						<Menu />
					</IconButton>}

					<div className='header-logo-container'>
						<Typography>
							<Button key={`${LINKS[0]}1`} onClick={() => { nextPath(`/${LINKS[0].toLowerCase()}`); }}>
								<img className='header-logo-small' src='/images/logo-small.png' />
							</Button>
						</Typography>

						<UsersOnline usersOnline={usersOnline} />
					</div>

					{width >= MENU_WIDTH_MIN && <nav>
						{LINKS.map(label =>
							<Button key={`${label}1`} onClick={() => { nextPath(`/${label.toLowerCase()}`); }}>
								{label}
							</Button>
						)}
					</nav>}

					{!currentUsername && <Authorize
						serverUrl={serverUrl}
						register={register}
						authorize={authorize}
					/>}

					{currentUsername && <CurrentUser
						currentUsername={currentUsername}
						avatar={avatar}
						logout={logout}
					/>}
				</div>
			</Toolbar>

			<nav>
				<Drawer open={isDrawerShown} onClose={handleDrawerToggle}>
					<div
						tabIndex={0}
						role='button'
						onClick={handleDrawerToggle}
						onKeyDown={handleDrawerToggle}
					>

						<List>
							{LINKS.map(label =>
								<ListItem button={true} key={`${label}2`}>
									<ListItemText primary={label} onClick={() => { nextPath(`/${label.toLowerCase()}`); }} />
								</ListItem>
							)}
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
	logout: bindActionCreators(logoutWithoutDispatch, dispatch),
});

export const Header = withRouter(connect(
	mapStateToProps,
	mapDispatchToProps,
)(HeaderPure as ComponentType<any>) as ComponentType<any>);
