import React, { Component, Props, Fragment } from 'react';
import { object, bool, func } from 'prop-types';
import { Typography } from '@material-ui/core';

import { PerudoDices, PerudoMove, PerudoLastRoundResults } from '../../components';
import * as types from '../../constants';

interface PerudoProps extends Props<{}> {
	game: types.Game,
	currentUser: types.User,
	isMyTurn: boolean,
	move: (move: string) => void,
}

export class Perudo extends Component<PerudoProps, {}> {
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
			game,
			isMyTurn,
			move,
			currentUser,
		} = this.props;
		const { gameData, players } = game;

		if (!currentUser) {
			return null;
		}

		const {
			currentDiceNumber,
			currentDiceFigure,
			currentRound,
			lastPlayerNumber,
			isMaputoRound,
			lastRoundResults,
			lastRoundFigure,
			isLastRoundMaputo,
			players: playersInGame,
		} = JSON.parse(gameData);
		const isMaputoAble = (playersInGame.find((playerInGame: types.PlayerInGame) => playerInGame.id === currentUser.id) || {}).dices.length === 1
			&& !currentDiceNumber
			&& !currentDiceFigure; // TODO: Add conditions (players count, dices count)

		console.log(lastRoundFigure, isLastRoundMaputo);

		return (
			<Fragment>
				{lastRoundResults.length > 0 && currentDiceNumber === 0 && currentDiceFigure === 0 && <Fragment>
					<Typography>
						Last round results
					</Typography>

					<PerudoLastRoundResults
						gameName={types.PERUDO}
						currentUserId={''}
						playersInGame={lastRoundResults}
						players={players}
						nextPlayers={[]}
					/>
				</Fragment>}

				<Typography>
					Round: {currentRound} {isMaputoRound && <span>(maputo)</span>}
				</Typography>

				{(lastPlayerNumber || lastPlayerNumber === 0) && <Typography>
					Last player: {players[lastPlayerNumber].username}
				</Typography>}

				{(currentDiceNumber && currentDiceFigure) ? <Fragment>
					<Typography>
						Current bet
					</Typography>

					<PerudoDices dices={Array(currentDiceNumber).fill(currentDiceFigure)} />
				</Fragment> : ''}

				{isMyTurn && <PerudoMove
					game={game}
					isMaputoAble={isMaputoAble}
					move={move}
				/>}
			</Fragment>
		);
	}
};
