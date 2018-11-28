import * as React from 'react';
import { Button } from '@material-ui/core';

import { CHIP } from '../../services';
import * as types from '../../constants';

interface NoThanksProps extends React.Props<{}> {
	game: types.Game,
	currentUser: types.User,
	move: (move: string) => void,
}

export class NoThanks extends React.Component<NoThanksProps, {}> {
	render() {
		const {
			game: {
				gameData,
				name,
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
		const myChips = playersInGame.find(playerInGame => playerInGame.id === currentUser.id).chips;

		return (
			<div>
				<div>
					{name}
				</div>
				<div>
					{myTurn && <span>YOUR MOVE!</span>}
				</div>
				{nextPlayers && nextPlayers.length && <div>
					Next player: {players.find(player => player.id === nextPlayers[0].id)!.username}
				</div>}
				<div>
					Cards left: {cardsLeft}
				</div>
				<div>
					Current card: {currentCard}
				</div>
				<div>
					{Array((currentCardCost || 0) + 1).join(CHIP)} ({currentCardCost})
				</div>

				{playersInGame.map((playerInGame, index) => (
					<div key={index}>
						{playerInGame.id !== currentUser.id && <div key={index}>
							{players.find(player => player.id === playerInGame.id)!.username}:
							{playerInGame.cards.map((card, i) => (
								<span key={i}>
									{card},
								</span>
							))}
						</div>}
					</div>
				))}

				<div>
					<div>
						My chips: {Array(myChips + 1).join(CHIP)} ({myChips})
					</div>
					<div>
						My cards: {playersInGame.find(playerInGame => playerInGame.id === currentUser.id).cards.map((card, i) => (
							<span key={i}>
								{card},
							</span>
						))}
					</div>
					<div>
						My points: {playersInGame.find(playerInGame => playerInGame.id === currentUser.id).points}
					</div>
				</div>

				{myTurn && <div>
					<Button
						variant='contained'
						color='primary'
						onClick={() => { move(JSON.stringify({ takeCard: false })); }}
						disabled={!myChips}
					>
						Pay
					</Button>
					<Button variant='contained' color='primary' onClick={() => { move(JSON.stringify({ takeCard: true })); }}>Take</Button>
				</div>}
			</div>
		);
	}
};
