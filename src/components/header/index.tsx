import React, { Component, Props, ComponentType } from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';
import { withRouter, RouteProps } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { History } from 'history';

import { Authorize, CurrentUser, UsersOnline } from '../../components';
import * as types from '../../constants';

import './index.scss';

const MENU_WIDTH_MIN = 600;

interface IHeaderProps extends Props<{}> {
	currentUser: types.IUser,
	history: History,
	usersOnline: types.IUsersOnline,
}

interface IHeaderState {
	width: number,
	isDrawerShown: boolean,
}

class HeaderPure extends Component<IHeaderProps & RouteProps, IHeaderState> {
	static propTypes = {
		currentUser: object,
		history: object,
		usersOnline: object.isRequired,
	}

	static defaultProps = {
		currentUser: {},
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
		const { currentUser, usersOnline } = this.props;
		const { width, isDrawerShown } = this.state;

		const currentUsername = currentUser && currentUser.username;
		const avatar = currentUser && currentUser.avatar;

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

const mapStateToProps = (state: { users: types.IUsersState, games: types.IGamesState }) => ({
	usersOnline: state.users.usersOnline,
	isConnected: state.users.isConnected,
	currentUser: state.users.currentUser,
});

const mapDispatchToProps = () => ({
});

export const Header = withRouter(connect(
	mapStateToProps,
	mapDispatchToProps,
)(HeaderPure as ComponentType<any>) as ComponentType<any>);
