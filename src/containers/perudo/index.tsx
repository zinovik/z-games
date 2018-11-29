import * as React from 'react';
import { Button, Checkbox } from '@material-ui/core';

import { DICES } from '../../services';
import * as types from '../../constants';

const DICE_MAX_FIGURE = 6;
const JOKER_FIGURE = 1;

interface PerudoProps extends React.Props<{}> {
	game: types.Game,
	currentUser: types.User,
	move: (move: string) => void,
}

interface PerudoState {
	diceNumber: number;
	diceFigure: number;
	isMaputo: boolean;
}

export class Perudo extends React.Component<PerudoProps, PerudoState> {
	public state = {
		diceNumber: 0,
		diceFigure: 0,
		isMaputo: false,
	};

	numberInc = ({ diceNumber, diceFigure }: { diceNumber: number, diceFigure: number }): void => {
		diceNumber++;

		this.setState({ diceNumber, diceFigure });
	}

	numberDec = ({ diceNumber, diceFigure }: { diceNumber: number, diceFigure: number }): void => {
		diceNumber--;

		const { game: { gameData } } = this.props;
		const { currentDiceNumber } = JSON.parse(gameData);

		if (diceNumber <= currentDiceNumber) {
			diceFigure = JOKER_FIGURE;
		}

		this.setState({ diceNumber, diceFigure });
	}

	figureInc = ({ diceNumber, diceFigure }: { diceNumber: number, diceFigure: number }): void => {
		diceFigure++;

		const { game: { gameData } } = this.props;
		const { currentDiceFigure, currentDiceNumber, players: playersInGame } = JSON.parse(gameData);
		const allDicesCount = playersInGame.reduce((diceCount, player) => diceCount + (player.dicesCount || 0), 0);

		if (currentDiceNumber === allDicesCount && diceFigure <= currentDiceFigure) {
			diceNumber = allDicesCount;
			diceFigure = currentDiceFigure + 1;
		} else if (diceNumber <= currentDiceNumber) {
			diceNumber = diceFigure <= currentDiceFigure ? currentDiceNumber + 1 : currentDiceNumber;
		}

		this.setState({ diceNumber, diceFigure });
	}

	figureDec = ({ diceNumber, diceFigure }: { diceNumber: number, diceFigure: number }): void => {
		diceFigure--;

		const { game: { gameData } } = this.props;
		const { currentDiceFigure, currentDiceNumber, players: playersInGame } = JSON.parse(gameData);
		const allDicesCount = playersInGame.reduce((diceCount, player) => diceCount + (player.dicesCount || 0), 0);
		const minDiceNumber = currentDiceFigure === JOKER_FIGURE ? currentDiceNumber + 1 : Math.ceil(currentDiceNumber / 2);

		if (diceNumber >= allDicesCount) {
			diceFigure = JOKER_FIGURE;
			diceNumber = minDiceNumber;
		}

		if (diceFigure <= currentDiceFigure && diceFigure !== JOKER_FIGURE && diceNumber <= currentDiceNumber) {
			diceNumber++;
		}

		this.setState({ diceNumber, diceFigure });
	}

	moveBet = (diceNumber: number, diceFigure: number) => {
		const { isMaputo } = this.state;

		this.props.move(JSON.stringify({ number: diceNumber, figure: diceFigure, isMaputo }));
		this.setState({ diceNumber: 0, diceFigure: 0 });
	}

	moveNotBelieve = () => {
		this.props.move(JSON.stringify({ notBelieve: true }));
		this.setState({ diceNumber: 0, diceFigure: 0 });
	}

	handleMaputoChange = () => {
		this.setState({ isMaputo: !this.state.isMaputo });
	}

	render() {
		const {
			game: {
				gameData,
				name,
				nextPlayers,
				players,
			},
			currentUser,
		} = this.props;

		if (!currentUser) {
			return null;
		}

		const { currentDiceNumber, currentDiceFigure, currentRound, lastPlayerNumber, isMaputoRound, players: playersInGame } = JSON.parse(gameData);
		const isMaputoAble = playersInGame.find(playerInGame => playerInGame.id === currentUser.id).dices.length === 1 && !currentDiceNumber && !currentDiceFigure;
		const allDicesCount = playersInGame.reduce((diceCount, player) => diceCount + (player.dicesCount || 0), 0);
		const minDiceNumber = currentDiceFigure === JOKER_FIGURE ? currentDiceNumber + 1 : Math.ceil(currentDiceNumber / 2);

		let { diceNumber, diceFigure } = this.state;

		let moveImpossible = false;
		if (!diceNumber || !diceFigure) {

			diceNumber = (currentDiceNumber || 0) + 1;
			diceFigure = currentDiceFigure || 2;

			if (currentDiceNumber >= allDicesCount) {
				if (currentDiceFigure !== JOKER_FIGURE) {
					diceNumber--;
					if (diceFigure < DICE_MAX_FIGURE) {
						diceFigure++;
					} else {
						diceFigure = JOKER_FIGURE;
						diceNumber = minDiceNumber;
					}
				} else {
					moveImpossible = true;
				}
			}
		}

		let figureChangeImpossible = false;
		if ((currentDiceNumber >= allDicesCount && (currentDiceFigure === JOKER_FIGURE || currentDiceFigure === DICE_MAX_FIGURE))
			|| (currentDiceFigure === JOKER_FIGURE && currentDiceNumber * 2 + 1 >= allDicesCount)) {
			figureChangeImpossible = true;
		}

		const myBetNumberDecDisable = diceNumber <= (minDiceNumber || 1);
		const myBetNumberIncDisable = diceNumber >= allDicesCount;
		const myBetFigureDecDisable = diceFigure <= (currentDiceNumber && currentDiceFigure ? 1 : 2) || figureChangeImpossible;
		const myBetFigureIncDisable = diceFigure >= DICE_MAX_FIGURE || figureChangeImpossible;

		const myTurn = nextPlayers.find(nextPlayer => nextPlayer.id === currentUser.id);

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
				{(lastPlayerNumber || lastPlayerNumber === 0) && <div>
					Last player: {players[lastPlayerNumber].username}
				</div>}
				<div>
					Last round results:
				</div>
				<div>
					Round: {currentRound} {isMaputoRound && <span>(maputo)</span>}
				</div>
				{(currentDiceNumber && currentDiceFigure) ? <div>
					Current bet: {Array(currentDiceNumber + 1).join(DICES[(currentDiceFigure || 0) - 1])}
				</div> : ''}
				{myTurn && <div>
					My bet: {Array(diceNumber + 1).join(DICES[diceFigure - 1])}
				</div>}
				<div>
					All dices count: {allDicesCount}
				</div>

				{playersInGame.map((playerInGame, index) => (
					<div key={index}>
						{playerInGame.id !== currentUser.id && <div key={index}>
							{players[index].username}: {playerInGame.dicesCount} dices
						</div>}
					</div>
				))}

				{playersInGame.map((playerInGame, index) => (
					<div key={index}>
						{(playerInGame.id === currentUser.id) && <div>
							<div>
								My dices: {playerInGame.dices && playerInGame.dices.map((dice, i) => (<span key={i}>{DICES[dice - 1]}</span>))}
							</div>
						</div>}
					</div>
				))}

				{myTurn && <div>

					Dice number:
					<div>
						<Button variant='contained' color='primary' onClick={() => { this.numberDec({ diceNumber, diceFigure }); }} disabled={myBetNumberDecDisable}>-</Button>
						{diceNumber}
						<Button variant='contained' color='primary' onClick={() => { this.numberInc({ diceNumber, diceFigure }); }} disabled={myBetNumberIncDisable}>+</Button>
					</div>

					{!isMaputoRound && <div>
						Dice figure:
						<div>
							<Button variant='contained' color='primary' onClick={() => { this.figureDec({ diceNumber, diceFigure }); }} disabled={myBetFigureDecDisable}>-</Button>
							{diceFigure}
							<Button variant='contained' color='primary' onClick={() => { this.figureInc({ diceNumber, diceFigure }); }} disabled={myBetFigureIncDisable}>+</Button>
						</div>
					</div>}

					{isMaputoAble && <div><Checkbox color='primary' onChange={this.handleMaputoChange} />Maputo</div>}
					<Button variant='contained' color='primary' onClick={() => { this.moveBet(diceNumber, diceFigure); }} disabled={moveImpossible}>Bet</Button>
					<Button variant='contained' color='primary' onClick={() => { this.moveNotBelieve(); }} disabled={!currentDiceNumber || !currentDiceFigure}>Not Believe</Button>

				</div>}
			</div>
		);
	}
};
