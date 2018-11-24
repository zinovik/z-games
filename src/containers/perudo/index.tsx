import * as React from 'react';
import { Button } from '@material-ui/core';

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
				gameData,
				name,
				nextPlayersNames,
				players,
			},
			currentUsername,
		} = this.props;

		const { currentDiceNumber = 0, currentDiceFigure = 0, currentRound, lastPlayerNumber } = JSON.parse(gameData);

		let { diceNumber, diceFigure } = this.state;

		if ((diceNumber === currentDiceNumber && diceFigure <= currentDiceFigure) || (diceNumber < currentDiceNumber)) {
			diceNumber = currentDiceNumber + 1;
			diceFigure = currentDiceFigure || 2;
		}

		// const allDicesCount = playersInGame.reduce((diceCount, player) => diceCount + (player.dicesCount || 0), 0);

		const myBetNumberDecDisable = diceNumber <= 1 || diceNumber <= currentDiceNumber || (diceNumber <= currentDiceNumber + 1 && diceFigure <= currentDiceFigure);
		// const myBetNumberIncDisable = diceNumber >= allDicesCount;
		const myBetFigureDecDisable = diceFigure <= 2 || (diceNumber === currentDiceNumber && diceFigure <= currentDiceFigure + 1);
		const myBetFigureIncDisable = diceFigure >= 6;

		const myTurn = nextPlayersNames && nextPlayersNames.indexOf(currentUsername) >= 0;

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
				{(lastPlayerNumber || lastPlayerNumber === 0) && <div>
					Last player: {players[lastPlayerNumber].username}
				</div>}
				<div>
					Last round results:
				</div>
				<div>
					Round: {currentRound}
				</div>
				{(currentDiceNumber && currentDiceFigure) ? <div>
					Current bet: {Array(currentDiceNumber + 1).join(DICES[(currentDiceFigure || 0) - 1])}
				</div> : ''}
				{myTurn && <div>
					My bet: {Array(diceNumber + 1).join(DICES[diceFigure - 1])}
				</div>}
				<div>
					{/* All dices count: {allDicesCount} */}
				</div>

				{/* {playersInGame.map((playerInGame, index) => (
					<div key={index}>
						{players[index].username !== currentUsername && <div key={index}>
							{players[index].username}: {playerInGame.dicesCount} dices
						</div>}
					</div>
				))}

				{playersInGame.map((playerInGame, index) => (
					<div key={index}>
						{(players[index].username === currentUsername) && <div>
							<div>
								My dices: {playerInGame.dices && playerInGame.dices.map((dice, i) => (<span key={i}>{DICES[dice - 1]}</span>))}
							</div>
						</div>}
					</div>
				))} */}

				{myTurn && <div>

					Dice number:
					<div>
						<Button variant='contained' color='primary' onClick={() => { this.setState({ diceNumber: diceNumber - 1, diceFigure }); }} disabled={myBetNumberDecDisable}>-</Button>
						{diceNumber}
						{/* <Button variant='contained' color='primary' onClick={() => { this.setState({ diceNumber: diceNumber + 1, diceFigure }); }} disabled={myBetNumberIncDisable}>+</Button> */}
					</div>

					Dice figure:
					<div>
						<Button variant='contained' color='primary' onClick={() => { this.setState({ diceNumber, diceFigure: diceFigure - 1 }); }} disabled={myBetFigureDecDisable}>-</Button>
						{diceFigure}
						<Button variant='contained' color='primary' onClick={() => { this.setState({ diceNumber, diceFigure: diceFigure + 1 }); }} disabled={myBetFigureIncDisable}>+</Button>
					</div>

					<Button variant='contained' color='primary' onClick={() => { this.moveBet(diceNumber, diceFigure); }}>Bet</Button>
					<Button variant='contained' color='primary' onClick={() => { this.moveNotBelieve(); }} disabled={!currentDiceNumber || !currentDiceFigure}>Not Believe</Button>

				</div>}
			</div>
		);
	}
};
