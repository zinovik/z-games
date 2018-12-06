import React, { Component, Props } from 'react';
import { bool, string, func } from 'prop-types';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Gamepad } from '@material-ui/icons';

import { Authorize, CurrentUser } from '../../components';
import './index.css';

interface HeaderProps extends Props<{}> {
	isConnected: boolean,
	currentUsername: string,
	signIn: (username: string, password: string) => void,
	signUp: (username: string, password: string) => void,
	logOut: () => void,
}

export class Header extends Component<HeaderProps, {}> {
	static propTypes = {
		isConnected: bool,
		currentUsername: string,
		signIn: func.isRequired,
		signUp: func.isRequired,
		logOut: func.isRequired,
	}

	static defaultProps = {
		isConnected: true,
		currentUsername: '',
		signIn: () => console.log,
		signUp: () => console.log,
		logOut: () => console.log,
	}

	render() {
		const { isConnected, currentUsername, signIn, signUp, logOut } = this.props;

		return (
			<AppBar position='static'>
				<Toolbar>

					{isConnected && <Gamepad />}

					<nav>
						<Link to='/home'>
							<Button>
								Home
							</Button>
						</Link>

						<Link to='/games'>
							<Button>
								Games
							</Button>
						</Link>

						<Link to='/rating'>
							<Button>
								Rating
							</Button>
						</Link>

						<Link to='/profile'>
							<Button>
								Profile
							</Button>
						</Link>

						<Link to='/about'>
							<Button>
								About
							</Button>
						</Link>
					</nav>

					{!currentUsername && <Authorize onSignInClick={signIn} onSignUpClick={signUp} />}
					{currentUsername && <CurrentUser currentUsername={currentUsername} onLogOutClick={logOut} />}

				</Toolbar>
			</AppBar>
		);
	}
};
