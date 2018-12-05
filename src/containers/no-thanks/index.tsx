import React, { Component, Props, Fragment } from 'react';
import { object, bool, func } from 'prop-types';
import { Button, Typography } from '@material-ui/core';

import { NoThanksCard, NoThanksChips } from '../../components';
import * as types from '../../constants';

interface NoThanksProps extends Props<{}> {
	game: types.Game,
	currentUser: types.User,
	isMyTurn: boolean,
	move: (move: string) => void,
}

export class NoThanks extends Component<NoThanksProps, {}> {
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

	render() {
		const {
			game: { gameData },
			currentUser,
			isMyTurn,
			move,
		} = this.props;

		if (!currentUser) {
			return null;
		}

		const { currentCard, currentCardCost, cardsLeft, players: playersInGame } = JSON.parse(gameData);

		const myChips = playersInGame.find((playerInGame: types.PlayerInGame) => playerInGame.id === currentUser.id).chips;

		return (
			<Fragment>

				<Typography>
					Cards left: {cardsLeft}
				</Typography>
				<NoThanksCard card={currentCard} />
				<NoThanksChips chips={currentCardCost} />

				{isMyTurn && <div>
					<Button
						variant='contained'
						onClick={() => { move(JSON.stringify({ takeCard: false })); }}
						disabled={!myChips}
					>
						Pay
					</Button>
					<Button variant='contained' onClick={() => { move(JSON.stringify({ takeCard: true })); }}>Take</Button>
				</div>}
			</Fragment>
		);
	}
};
