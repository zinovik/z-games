import * as React from 'react';
import { Button } from '@material-ui/core';

import { CHIP } from '../../services';
import * as types from '../../constants';

interface NoThanksProps extends React.Props<{}> {
	game: types.Game,
	currentUsername: string | '',
	move: any,
}

export class NoThanks extends React.Component<NoThanksProps, {}> {
	render() {
		const {
			game: {
				gameData,
				name,
				nextPlayersNames,
				players,
			},
			currentUsername,
			move,
		} = this.props;

		const { currentCard, currentCardCost, cardsLeft } = JSON.parse(gameData);

		const myTurn = nextPlayersNames && nextPlayersNames.indexOf(currentUsername) >= 0;

		// let myChips = 0;
		players.forEach((player, index) => {
			if (player.username === currentUsername) {
				// myChips = playersInGame[index] && playersInGame[index].chips || 0;
			}
		});

		return (
			<div>
				<div>
					{name}
				</div>
				<div>
					{myTurn && <span>YOUR MOVE!</span>}
				</div>
				<div>
					Next player: {nextPlayersNames && nextPlayersNames[0]}
				</div>
				<div>
					Cards left: {cardsLeft}
				</div>
				<div>
					Current card: {currentCard}
				</div>
				<div>
					{Array((currentCardCost || 0) + 1).join(CHIP)} ({currentCardCost})
				</div>

				{/* {playersInGame.map((playerInGame, index) => (
					<div key={index}>
						{players[index].username !== currentUsername && <div key={index}>
							{players[index].username}:
							{(playerInGame.cards || []).map((card, i) => (
								<span key={i}>
									{card},
								</span>
							))}
						</div>}
					</div>
				))}

				{playersInGame.map((playerInGame, index) => (
					<div key={index}>
						{(players[index].username === currentUsername) && <div>
							<div>
								My chips: {Array(myChips + 1).join(CHIP)} ({myChips})
							</div>
							<div>
								My cards:
								{(playerInGame.cards || []).map((card, i) => (
									<span key={i}>
										{card},
									</span>
								))}
							</div>
							<div>
								My points: {playerInGame.points}
							</div>
						</div>}
					</div>
				))} */}

				{myTurn && <div>
					<Button
						variant='contained'
						color='primary'
						onClick={() => { move({ takeCard: false }); }}
						// disabled={!myChips}
					>
						Pay
					</Button>
					<Button variant='contained' color='primary' onClick={() => { move({ takeCard: true }); }}>Take</Button>
				</div>}
			</div>
		);
	}
};
