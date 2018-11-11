import * as React from 'react';

import { DICES } from '../../services';
import * as types from '../../constants';

interface PerudoProps extends React.Props<{}> {
	game: types.Game,
	currentUsername: string | null,
	move: any,
}

export class Perudo extends React.Component<PerudoProps, {}> {

	diceNumber: number;
	diceFigure: number;

	allDicesCount: number;

	currentBet: String = '';
	myBet: String = '';

	myBetNumberIncDisable: Boolean;
	myBetNumberDecDisable: Boolean;
	myBetFigureIncDisable: Boolean;
	myBetFigureDecDisable: Boolean;

	diceNumberInc() {
		if (!this.myBetNumberIncDisable) {
			this.diceNumber++;
			this.updateMyBet();
		}
	}

	diceNumberDec() {
		if (!this.myBetNumberDecDisable) {
			this.diceNumber--;
			this.updateMyBet();
		}
	}

	diceFigureInc() {
		if (!this.myBetFigureIncDisable) {
			this.diceFigure++;
			this.updateMyBet();
		}
	}

	diceFigureDec() {
		if (!this.myBetFigureDecDisable) {
			this.diceFigure--;
			this.updateMyBet();
		}
	}

	moveBet() {
		this.props.move({ number: this.diceNumber, figure: this.diceFigure });
		this.diceNumber = 0;
		this.diceFigure = 0;
	}

	moveNotBelieve() {
		this.props.move({ notBelieve: true });
		this.diceNumber = 0;
		this.diceFigure = 0;
	}

	updateAllDicesCount() {
		const {
			game: {
				gameInfo: {
					players = [],
				},
			},
		} = this.props;

		this.allDicesCount = 0;

		players.forEach(player => {
			this.allDicesCount += player.dicesCount || 0;
		});
	}

	updateMyBet() {
		const {
			game: {
				nextPlayersNames = [],
				gameInfo: {
					currentDiceNumber = 0,
					currentDiceFigure = 0,
				},
			},
			currentUsername,
		} = this.props;

		if (nextPlayersNames[0] === currentUsername) {
			if (!this.diceNumber || !this.diceFigure) {
				this.diceNumber = 1;
				this.diceFigure = 2;
				if (currentDiceNumber && currentDiceFigure) {
					this.diceNumber = currentDiceNumber + 1;
					this.diceFigure = currentDiceFigure;
				}
			}
		}

		this.myBet = '';
		for (let i = 0; i < this.diceNumber; i++) {
			this.myBet = `${this.myBet}${DICES[this.diceFigure - 1]}`;
		}

		this.myBetNumberIncDisable = this.diceNumber >= this.allDicesCount;
		this.myBetNumberDecDisable = this.diceNumber <= 1
			|| this.diceNumber <= currentDiceNumber
			|| (this.diceNumber <= currentDiceNumber + 1 && this.diceFigure <= currentDiceFigure);

		this.myBetFigureIncDisable = this.diceFigure >= 6;
		this.myBetFigureDecDisable = this.diceFigure <= 2
			|| (this.diceNumber === currentDiceNumber && this.diceFigure <= currentDiceFigure + 1);
	}

	render() {
		this.updateAllDicesCount();
		this.updateMyBet();

		const { game, currentUsername } = this.props;

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
					Last round results:
				</div>
				<div>
					Round: {game.gameInfo.currentRound}
				</div>
				<div>
					My bet:
				</div>
				<div>
					All dices count:
				</div>
				<div>
					My dices:
				</div>

				{game.nextPlayersNames && game.nextPlayersNames[0] === currentUsername && <div>
					Dice number:
					<div>
						<button>+</button>
						{this.diceNumber}
						<button>-</button>
					</div>
					Dice figure:
					<div>
						<button>+</button>
						{this.diceFigure}
						<button>-</button>
					</div>
					<button onClick={this.moveBet}>Bet</button>
					<button onClick={this.moveNotBelieve}>Not Believe</button>
				</div>}
			</div>
		);
	}
};
