import React, { Fragment } from 'react';
import { object, bool, func } from 'prop-types';
import { Typography } from '@material-ui/core';
import { ILostCitiesData } from 'z-games-lost-cities';

import { LostCitiesMove } from './lost-cities-move';
import { LostCitiesExpeditions } from './lost-cities-expeditions';
import { IGame, IUser } from '../../../interfaces';

export function LostCities({ game, currentUser, isMyTurn, isButtonsDisabled, makeMove }: {
	game: IGame,
	currentUser: IUser,
	isMyTurn: boolean,
	isButtonsDisabled: boolean,
	makeMove: ({ gameNumber, move }: { gameNumber: number, move: string }) => void,
}) {
	const { gameData } = game;

	if (!currentUser) {
		return null;
	}

	const { discards, cardsLeft, discardsCount }: ILostCitiesData = JSON.parse(gameData);

	return (
		<Fragment>

			<Typography>
				Cards left: {cardsLeft}
			</Typography>

			{!isMyTurn || (isMyTurn && !discards.length) && <Fragment>
				<Typography>
					Discards:
					</Typography>
				<LostCitiesExpeditions cards={discards} cardsCount={discardsCount} />
			</Fragment>}

			{isMyTurn && <LostCitiesMove
				game={game}
				currentUser={currentUser}
				isButtonsDisabled={isButtonsDisabled}
				makeMove={makeMove}
			/>}
		</Fragment>
	);
}

LostCities.propTypes = {
	game: object.isRequired,
	currentUser: object.isRequired,
	isMyTurn: bool.isRequired,
	isButtonsDisabled: bool.isRequired,
	makeMove: func.isRequired,
};

LostCities.defaultProps = {
	game: {},
	currentUser: {},
	isMyTurn: false,
	isButtonsDisabled: false,
	makeMove: () => null,
};
