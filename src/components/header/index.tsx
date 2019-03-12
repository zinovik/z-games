import React, { Component, Props, ComponentType } from 'react';
import { string, func, object, array } from 'prop-types';
import { withRouter, RouteProps } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { History } from 'history';

import { Authorize, CurrentUser, UsersOnline } from '../../components';
import * as types from '../../constants';
import './index.css';

const MENU_WIDTH_MIN = 600;

interface HeaderProps extends Props<{}> {
	currentUsername: string,
	avatar: string,
	serverUrl: string,
	signIn: (username: string, password: string) => void,
	signUp: (username: string, password: string) => void,
	logOut: () => void,
	history: History,
	usersOnline: types.User[],
}

interface HeaderState {
	width: number,
	isDrawerShown: boolean,
}

class Header extends Component<HeaderProps & RouteProps, HeaderState> {
	static propTypes = {
		currentUsername: string,
		avatar: string,
		serverUrl: string.isRequired,
		signIn: func.isRequired,
		signUp: func.isRequired,
		logOut: func.isRequired,
		history: object,
		usersOnline: array.isRequired,
	}

	static defaultProps = {
		currentUsername: '',
		signIn: () => console.log,
		signUp: () => console.log,
		logOut: () => console.log,
	}

	state = {
		width: window.innerWidth,
		isDrawerShown: false,
	};

	handleDrawerToggle = (): void => {
		this.setState(({ isDrawerShown: !this.state.isDrawerShown }));
	};

	componentDidMount = () => {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount = () => {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions = () => {
		this.setState({ width: window.innerWidth });
	}

	nextPath = (path: string) => {
		const { history } = this.props;

		if (history) {
			history.push(path);
		}
	}

	render() {
		const { currentUsername, avatar, serverUrl, signIn, signUp, logOut, usersOnline } = this.props;
		const { width, isDrawerShown } = this.state;

		const LINKS = ['Home', 'Games', 'Rating', 'Rules', 'Profile', 'About'];

		return (
			<AppBar position='static'>
				<Toolbar>
					<div className='header-toolbar'>
						{width < MENU_WIDTH_MIN && <IconButton
							color='inherit'
							aria-label='Open drawer'
							onClick={this.handleDrawerToggle}
						>
							<Menu />
						</IconButton>}

						<div className='header-logo-container'>
							<Typography>
								<Button key={`${LINKS[0]}1`} onClick={() => { this.nextPath(`/${LINKS[0].toLowerCase()}`); }}>
									<img className='header-logo-small' src='/images/logo-small.png' />
								</Button>
							</Typography>

							<UsersOnline usersOnline={usersOnline} />
						</div>

						{width >= MENU_WIDTH_MIN && <nav>
							{LINKS.map(label =>
								<Button key={`${label}1`} onClick={() => { this.nextPath(`/${label.toLowerCase()}`); }}>
									{label}
								</Button>
							)}
						</nav>}

						{!currentUsername && <Authorize serverUrl={serverUrl} onSignInClick={signIn} onSignUpClick={signUp} />}

						{currentUsername && <CurrentUser currentUsername={currentUsername} avatar={avatar} onLogOutClick={logOut} />}
					</div>
				</Toolbar>

				<nav>
					<Drawer open={isDrawerShown} onClose={this.handleDrawerToggle}>
						<div
							tabIndex={0}
							role='button'
							onClick={this.handleDrawerToggle}
							onKeyDown={this.handleDrawerToggle}
						>

							<List>
								{LINKS.map(label =>
									<ListItem button={true} key={`${label}2`}>
										<ListItemText primary={label} onClick={() => { this.nextPath(`/${label.toLowerCase()}`); }} />
									</ListItem>
								)}
							</List>

						</div>
					</Drawer>
				</nav>
			</AppBar>
		);
	}
};

export default withRouter(Header as ComponentType<any>);
