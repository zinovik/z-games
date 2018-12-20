import React, { Component, Props, Fragment } from 'react';
import { object, bool, func } from 'prop-types';
import { Button, Typography } from '@material-ui/core';

import { NoThanksCard, NoThanksChips } from '../../components';
import * as types from '../../constants';
import './index.css';

interface NoThanksProps extends Props<{}> {
	game: types.Game,
	currentUser: types.User,
	isMyTurn: boolean,
	move: (move: string) => void,
}

interface NoThanksState extends Props<{}> {
	isButtonsDisabled: boolean,
}


export class NoThanks extends Component<NoThanksProps, NoThanksState> {
	static propTypes = {
		game: object.isRequired,
		currentUser: object.isRequired,
		isMyTurn: bool.isRequired,
		move: func.isRequired,
	}

	static defaultProps = {
		game: {},
		currentUser: {},
		isMyTurn: false,
		move: () => console.log,
	}

	state = {
		isButtonsDisabled: false,
	};

	movePay = (): void => {
		const { move } = this.props;

		move(JSON.stringify({ takeCard: false }));

		// this.setState({ isButtonsDisabled: true });
	};

	moveTake = (): void => {
		const { move } = this.props;

		move(JSON.stringify({ takeCard: true }));

		// this.setState({ isButtonsDisabled: true });
	};

	render() {
		const {
			game: { gameData },
			currentUser,
			isMyTurn,
		} = this.props;

		const { isButtonsDisabled } = this.state;

		if (!currentUser) {
			return null;
		}

		const { currentCard, currentCardCost, cardsLeft, players: playersInGame } = JSON.parse(gameData);

		const currentPlayerInGame = playersInGame.find((playerInGame: types.PlayerInGame) => playerInGame.id === currentUser.id);
		const myChips = currentPlayerInGame && currentPlayerInGame.chips;

		return (
			<Fragment>

				<Typography>
					Cards left: {cardsLeft}
				</Typography>
				<NoThanksCard card={currentCard} />
				<NoThanksChips chips={currentCardCost} />

				{isMyTurn && <div className='no-thanks-buttons'>
					<Button variant='contained' color='primary' className='no-thanks-button' onClick={this.movePay} disabled={!myChips || isButtonsDisabled}>
						Pay
					</Button>
					<Button variant='contained' color='primary' className='no-thanks-button' onClick={this.moveTake} disabled={isButtonsDisabled}>
						Take
					</Button>
				</div>}
			</Fragment>
		);
	}
};
