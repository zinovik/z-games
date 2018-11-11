import * as React from 'react';

import { DICES } from '../../services';
import * as types from '../../constants';

interface PerudoProps extends React.Props<{}> {
	game: types.Game,
	currentUsername: string | null,
	move: any,
}

interface PerudoState {
	diceNumber: number;
	diceFigure: number;
}

export class Perudo extends React.Component<PerudoProps, PerudoState> {
	public state = {
		diceNumber: 0,
		diceFigure: 0,
	};

	moveBet(diceNumber: number, diceFigure: number) {
		this.props.move({ number: diceNumber, figure: diceFigure });
		this.setState({ diceNumber: 0, diceFigure: 0 });
	}

	moveNotBelieve() {
		this.props.move({ notBelieve: true });
		this.setState({ diceNumber: 0, diceFigure: 0 });
	}

	render() {
		const {
			game: {
				gameInfo: {
					currentDiceNumber = 0,
					currentDiceFigure = 0,
					currentRound,
					players = [],
				},
				name,
				nextPlayersNames,
			},
			currentUsername
		} = this.props;

		let { diceNumber, diceFigure } = this.state;

		if ((diceNumber === currentDiceNumber && diceFigure === currentDiceFigure)
			|| (diceNumber < currentDiceNumber) || (diceFigure < currentDiceFigure)) {
			diceNumber = currentDiceNumber + 1;
			diceFigure = currentDiceFigure || 2;
		}

		const allDicesCount = players.reduce((diceCount, player) => diceCount + (player.dicesCount || 0), 0);

		const myBetNumberIncDisable = diceNumber >= allDicesCount;
		const myBetNumberDecDisable = diceNumber <= 1 || diceNumber <= currentDiceNumber || (diceNumber <= currentDiceNumber + 1 && diceFigure <= currentDiceFigure);
		const myBetFigureIncDisable = diceFigure >= 6;
		const myBetFigureDecDisable = diceFigure <= 2 || (diceNumber === currentDiceNumber && diceFigure <= currentDiceFigure + 1);

		return (
			<div>
				<div>
					{name}
				</div>
				<div>
					{nextPlayersNames && nextPlayersNames[0] === currentUsername && <span>YOUR MOVE!</span>}
				</div>
				<div>
					Next player: {nextPlayersNames && nextPlayersNames[0]}
				</div>
				<div>
					Last round results:
				</div>
				<div>
					Round: {currentRound}
				</div>
				<div>
					Current bet: {Array(currentDiceNumber).map(() => (DICES[(currentDiceFigure || 0) - 1]))}
				</div>
				<div>
					My bet: {Array(diceNumber).map(() => (DICES[diceFigure - 1]))}
				</div>
				<div>
					All dices count: {allDicesCount}
				</div>
				<div>
					My dices:
				</div>

				{nextPlayersNames && nextPlayersNames[0] === currentUsername && <div>

					Dice number:
					<div>
						<button onClick={() => { this.setState({ diceNumber: diceNumber - 1 }); }} disabled={myBetNumberDecDisable}>-</button>
						{diceNumber}
						<button onClick={() => { this.setState({ diceNumber: diceNumber + 1 }); }} disabled={myBetNumberIncDisable}>+</button>
					</div>

					Dice figure:
					<div>
						<button onClick={() => { this.setState({ diceFigure: diceFigure - 1 }); }} disabled={myBetFigureDecDisable}>-</button>
						{diceFigure}
						<button onClick={() => { this.setState({ diceFigure: diceFigure + 1 }); }} disabled={myBetFigureIncDisable}>+</button>
					</div>

					<button onClick={() => { this.moveBet(diceNumber, diceFigure); }}>Bet</button>
					<button onClick={() => { this.moveNotBelieve(); }}>Not Believe</button>

				</div>}
			</div>
		);
	}
};
