import React, { Fragment } from 'react';
import { object, bool, func } from 'prop-types';
import { Typography } from '@material-ui/core';
import { ILostCitiesData } from 'z-games-lost-cities';

import { LostCitiesMove } from './lost-cities-move';
import { LostCitiesCardsList } from './lost-cities-cards-list';
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
console.log(JSON.parse(gameData));
	const { discards, cardsLeft }: ILostCitiesData = JSON.parse(gameData);

	return (
		<Fragment>

			<Typography>
				Cards left: {cardsLeft}
			</Typography>

			<Typography>
				Discards:
			</Typography>
			<LostCitiesCardsList cards={discards} />

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
