import React, { Component, Props } from 'react';
import { object, func } from 'prop-types';
import { Button, Typography } from '@material-ui/core';

import { NoThanksCardsList, NoThanksCard, NoThanksChips } from '../../components';
import * as types from '../../constants';
import './index.css';

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
				players,
			},
			currentUser,
			move,
		} = this.props;

		if (!currentUser) {
			return null;
		}

		const { currentCard, currentCardCost, cardsLeft, players: playersInGame } = JSON.parse(gameData);

		const myTurn = nextPlayers.find(nextPlayer => nextPlayer.id === currentUser.id);
		const myChips = playersInGame.find((playerInGame: types.PlayerInGame) => playerInGame.id === currentUser.id).chips;

		return (
			<div>
				{myTurn && <Typography>
					YOUR MOVE!
				</Typography>}

				{!myTurn && nextPlayers && nextPlayers.length && <Typography>
					{players.find(player => player.id === nextPlayers[0].id)!.username} is going to make a move...
				</Typography>}

				<Typography>
					<NoThanksCard card={currentCard} />
				</Typography>
				<Typography>
					Cards left: {cardsLeft}
				</Typography>
				<Typography>
					<NoThanksChips chips={currentCardCost} />
				</Typography>

				{playersInGame.map((playerInGame: types.PlayerInGame, index: number) => (
					<div key={index}>
						{playerInGame.id !== currentUser.id && <div key={index}>
							{players.find(player => player.id === playerInGame.id)!.username}:
							<NoThanksCardsList cards={playerInGame.cards || []} />
						</div>}
					</div>
				))}

				<div className='no-thanks-my'>
					<Typography>
						MY
					</Typography>
					<Typography>
						<NoThanksCardsList cards={playersInGame.find((playerInGame: types.PlayerInGame) => playerInGame.id === currentUser.id).cards} />
					</Typography>
					<Typography>
						<NoThanksChips chips={myChips} />
					</Typography>
					<Typography>
						{playersInGame.find((playerInGame: types.PlayerInGame) => playerInGame.id === currentUser.id).points} points
					</Typography>
				</div>

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
			</div>
		);
	}
};
