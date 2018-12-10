import React, { Component, Props, ComponentType } from 'react';
import { bool, string, func, object } from 'prop-types';
import { withRouter, RouteProps } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { Gamepad, Menu } from '@material-ui/icons';
import { History } from 'history';

import { Authorize, CurrentUser } from '../../components';
import './index.css';

const MENU_WIDTH_MIN = 600;

interface HeaderProps extends Props<{}> {
	isConnected: boolean,
	currentUsername: string,
	signIn: (username: string, password: string) => void,
	signUp: (username: string, password: string) => void,
	logOut: () => void,
	history: History,
}

interface HeaderState {
	width: number,
	isDrawerShown: boolean,
}

class Header extends Component<HeaderProps & RouteProps, HeaderState> {
	static propTypes = {
		isConnected: bool,
		currentUsername: string,
		signIn: func.isRequired,
		signUp: func.isRequired,
		logOut: func.isRequired,
		history: object,
	}

	static defaultProps = {
		isConnected: true,
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
		const { isConnected, currentUsername, signIn, signUp, logOut } = this.props;
		const { width, isDrawerShown } = this.state;

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

						<Gamepad color={isConnected ? 'secondary' : 'default'} className='header-connected-icon' />

						{width >= MENU_WIDTH_MIN && <nav>
							{['Home', 'Games', 'Rating', 'Profile', 'About'].map(label =>
								<Button key={`${label}1`} onClick={() => { this.nextPath(`/${label.toLowerCase()}`); }}>
									{label}
								</Button>
							)}
						</nav>}

						{!currentUsername && <Authorize onSignInClick={signIn} onSignUpClick={signUp} />}
						{currentUsername && <CurrentUser currentUsername={currentUsername} onLogOutClick={logOut} />}
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
								{['Home', 'Games', 'Rating', 'Profile', 'About'].map(label =>
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
