import React, { Fragment } from 'react';
import { object, bool, func } from 'prop-types';
import { Typography } from '@material-ui/core';
import { PerudoData } from 'z-games-perudo';

import { PerudoDices, PerudoMove, PerudoLastRoundResults } from '../';
import * as types from '../../../constants';
import './index.scss';

export function Perudo({ game, currentUser, isMyTurn, move }: {
	game: types.IGame,
	currentUser: types.IUser,
	isMyTurn: boolean,
	move: (move: string) => void,
}) {
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
	}: PerudoData & { lastPlayerNumber: number } = JSON.parse(gameData); // TODO Check lastPlayerNumber in PerudoData

	const currentPlayerInGame = playersInGame.find(playerInGame => playerInGame.id === currentUser.id);
	const isMaputoAble = currentPlayerInGame && currentPlayerInGame.dices.length === 1
		&& !currentDiceNumber
		&& !currentDiceFigure
		&& playersInGame.filter(playerInGame => {
			return (playerInGame.dicesCount || 0) > 0;
		}).length > 2
		&& playersInGame.reduce((diceCount: number, playerInGame) => {
			return diceCount + (playerInGame.dicesCount || 0);
		}, 0) > 3;

	return (
		<Fragment>
			{lastRoundResults.length > 0 && currentDiceNumber === 0 && currentDiceFigure === 0 && <Fragment>
				<Typography>
					Last round results
				</Typography>

				<PerudoLastRoundResults
					playersInGame={lastRoundResults}
					players={players}
					lastRoundFigure={lastRoundFigure}
					isLastRoundMaputo={isLastRoundMaputo}
				/>
			</Fragment>}

			<Typography>
				Round: {currentRound} {isMaputoRound && <span>(maputo)</span>}
			</Typography>

			{(lastPlayerNumber || lastPlayerNumber === 0) && <Typography>
				Last player: {players[lastPlayerNumber].username}
			</Typography>}

			<div className='perudo-bets'>

				{(currentDiceNumber && currentDiceFigure) ? <div className='perudo-current-bet'>
					<Typography>
						Current bet
					</Typography>

					<PerudoDices dices={Array(currentDiceNumber).fill(currentDiceFigure)} />
				</div> : ''}

				{isMyTurn && <div className='perudo-my-bet'>
					<PerudoMove
						game={game}
						isMaputoAble={isMaputoAble}
						move={move}
					/>
				</div>}

			</div>

		</Fragment>
	);
};

Perudo.propTypes = {
	game: object.isRequired,
	currentUser: object.isRequired,
	isMyTurn: bool.isRequired,
	move: func.isRequired,
};

Perudo.defaultProps = {
	game: {},
	currentUser: {},
	isMyTurn: false,
	move: () => console.log,
};
