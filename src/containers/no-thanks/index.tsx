import React, { Component, Props, Fragment } from 'react';
import { object, func } from 'prop-types';
import { Button, Typography } from '@material-ui/core';

import { NoThanksCard, NoThanksChips } from '../../components';
import * as types from '../../constants';

interface NoThanksProps extends Props<{}> {
	game: types.Game,
	currentUser: types.User,
	move: (move: string) => void,
}

export class NoThanks extends Component<NoThanksProps, {}> {
	static propTypes = {
		game: object.isRequired,
		currentUser: object.isRequired,
		move: func.isRequired,
	}

	static defaultProps = {
		game: {},
		currentUser: {},
		move: () => console.log,
	}

	render() {
		const {
			game: {
				gameData,
				nextPlayers,
			},
			currentUser,
			move,
		} = this.props;

		if (!currentUser) {
			return null;
		}

		const { currentCard, currentCardCost, cardsLeft, players: playersInGame } = JSON.parse(gameData);

		const myTurn = nextPlayers.some(nextPlayer => nextPlayer.id === currentUser.id);
		const myChips = playersInGame.find((playerInGame: types.PlayerInGame) => playerInGame.id === currentUser.id).chips;

		return (
			<Fragment>

				<Typography>
					Cards left: {cardsLeft}
				</Typography>
				<NoThanksCard card={currentCard} />
				<NoThanksChips chips={currentCardCost} />

				{myTurn && <div>
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
