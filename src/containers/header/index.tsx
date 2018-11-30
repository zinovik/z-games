import * as React from 'react';
import { Link } from 'react-router-dom';

import { Authorize, CurrentUser } from '../../components';
import './index.css';

interface HeaderProps extends React.Props<{}> {
	isConnected: boolean,
	currentUsername: string,
	signIn: (username: string, password: string) => void,
	signUp: (username: string, password: string) => void,
	logOut: () => void,
}

export class Header extends React.Component<HeaderProps, {}> {
	render() {
		return (
			<div className='header-container'>

				{this.props.isConnected && <div>connected</div>}

				<nav>
					<Link to='/home'>Home</Link>
					<Link to='/games'>Games</Link>
					<Link to='/profile'>Profile</Link>
					<Link to='/about'>About</Link>
				</nav>

				{!this.props.currentUsername &&
					<Authorize onSignInClick={this.props.signIn} onSignUpClick={this.props.signUp} />
				}
				{this.props.currentUsername &&
					<CurrentUser currentUsername={this.props.currentUsername} onLogOutClick={this.props.logOut} />
				}
			</div>
		);
	}
};
