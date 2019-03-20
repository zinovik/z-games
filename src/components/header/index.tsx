import React, { Component, Props, ComponentType } from 'react';
import { string, object, array } from 'prop-types';
import { withRouter, RouteProps } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { History } from 'history';

import { Authorize, CurrentUser, UsersOnline } from '../../components';
import * as types from '../../constants';
import './index.scss';

const MENU_WIDTH_MIN = 600;

interface IHeaderProps extends Props<{}> {
	currentUsername: string,
	avatar: string,
	history: History,
	usersOnline: types.IUser[],
}

interface IHeaderState {
	width: number,
	isDrawerShown: boolean,
}

class Header extends Component<IHeaderProps & RouteProps, IHeaderState> {
	static propTypes = {
		currentUsername: string,
		avatar: string,
		history: object,
		usersOnline: array.isRequired,
	}

	static defaultProps = {
		currentUsername: '',
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
		const { currentUsername, avatar, usersOnline } = this.props;
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

						{!currentUsername && <Authorize />}

						{currentUsername && <CurrentUser currentUsername={currentUsername} avatar={avatar} />}
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
