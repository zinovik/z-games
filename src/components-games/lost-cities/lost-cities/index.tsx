import React, { Fragment } from 'react';
import { object, bool } from 'prop-types';
import { Typography } from '@material-ui/core';
import { ILostCitiesData } from 'z-games-lost-cities';

import { LostCitiesMove, LostCitiesCardsList } from '../';
import { IGame, IUser } from '../../../interfaces';

export function LostCities({ game, currentUser, isMyTurn }: {
	game: IGame,
	currentUser: IUser,
	isMyTurn: boolean,
}) {
	const { gameData } = game;

	if (!currentUser) {
		return null;
	}

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
			/>}
		</Fragment>
	);
}

LostCities.propTypes = {
	game: object.isRequired,
	currentUser: object.isRequired,
	isMyTurn: bool.isRequired,
};

LostCities.defaultProps = {
	game: {},
	currentUser: {},
	isMyTurn: false,
};
