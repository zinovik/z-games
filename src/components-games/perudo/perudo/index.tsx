import React, { Fragment } from 'react';
import { object, bool } from 'prop-types';
import { Typography } from '@material-ui/core';
import { IPerudoData } from 'z-games-perudo';

import { PerudoDices, PerudoMove, PerudoLastRoundResults } from '../';
import { IGame, IUser } from '../../../interfaces';

import './index.scss';

export function Perudo({ game, currentUser, isMyTurn }: {
	game: IGame,
	currentUser: IUser,
	isMyTurn: boolean,
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
		players: gamePlayers,
	}: IPerudoData = JSON.parse(gameData);

	const currentGamePlayer = gamePlayers.find(gamePlayer => gamePlayer.id === currentUser.id);
	const isMaputoAble = currentGamePlayer && currentGamePlayer.dices.length === 1
		&& !currentDiceNumber
		&& !currentDiceFigure
		&& gamePlayers.filter(gamePlayer => {
			return (gamePlayer.dicesCount || 0) > 0;
		}).length > 2
		&& gamePlayers.reduce((diceCount: number, gamePlayer) => {
			return diceCount + (gamePlayer.dicesCount || 0);
		}, 0) > 3;

	return (
		<Fragment>
			{lastRoundResults.length > 0 && currentDiceNumber === 0 && currentDiceFigure === 0 && <Fragment>
				<Typography>
					Last round results
				</Typography>

				<PerudoLastRoundResults
					gamePlayers={lastRoundResults}
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

				{isMyTurn && <PerudoMove
					game={game}
					isMaputoAble={isMaputoAble}
				/>}

			</div>

		</Fragment>
	);
};

Perudo.propTypes = {
	game: object.isRequired,
	currentUser: object.isRequired,
	isMyTurn: bool.isRequired,
};

Perudo.defaultProps = {
	game: {},
	currentUser: {},
	isMyTurn: false,
};
