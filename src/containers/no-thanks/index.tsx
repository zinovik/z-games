import * as React from 'react';

import { CHIP } from '../../services';
import * as types from '../../constants';

interface NoThanksProps extends React.Props<{}> {
	game: types.Game,
	currentUsername: string | null,
	move: any,
}

export class NoThanks extends React.Component<NoThanksProps, {}> {
	render() {
		const { game, currentUsername, move } = this.props;

		return (
			<div>
				<div>
					{game.name}
				</div>
				<div>
					{game.nextPlayersNames && game.nextPlayersNames[0] === currentUsername && <span>YOUR MOVE!</span>}
				</div>
				<div>
					Next player: {game.nextPlayersNames && game.nextPlayersNames[0]}
				</div>
				<div>
					Cards left: {game.gameInfo.cardsLeft}
				</div>
				<div>
					Current card: {game.gameInfo.currentCard}
				</div>
				<div>
					({game.gameInfo.currentCardCost})
				</div>

				{(game.gameInfo.players || []).map((player, index) => (
					<div key={index}>
						{game.players[index].username !== currentUsername && <div key={index}>
							{game.players[index].username}:
							{(player.cards || []).map((card, index) => (
								<span key={index}>
									{card},
								</span>
							))}
						</div>}
					</div>
				))}

				{(game.gameInfo.players || []).map((player, index) => (
					<div key={index}>
						{(game.players[index].username === currentUsername) && <div>
							<div>
								My chips: {Array(player.chips).map(() => ({CHIP}))} ({player.chips})
							</div>
							<div>
								My cards:
								{(player.cards || []).map((card, index) => (
									<span key={index}>
										{card},
									</span>
								))}
							</div>
							<div>
								My points: {player.points}
							</div>
						</div>}
					</div>
				))}

				{game.nextPlayersNames && game.nextPlayersNames[0] === currentUsername && <div>
					<button onClick={() => { move({ takeCard: false }); }}>Pay</button>
					<button onClick={() => { move({ takeCard: true }); }}>Take</button>
				</div>}
			</div>
		);
	}
};
