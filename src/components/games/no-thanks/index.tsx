import React, { Fragment } from 'react';
import { object, bool, func } from 'prop-types';
import { Typography } from '@material-ui/core';
import { INoThanksData } from 'z-games-no-thanks';

import { NoThanksMove } from './no-thanks-move';
import { NoThanksCard } from './no-thanks-card';
import { NoThanksChips } from './no-thanks-chips';
import { IGame, IUser } from '../../../interfaces';

export function NoThanks({ game, currentUser, isMyTurn, isButtonsDisabled, makeMove }: {
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

	const { currentCard, currentCardCost, cardsLeft }: INoThanksData = JSON.parse(gameData);

	return (
		<Fragment>

			<Typography>
				Cards left: {cardsLeft}
			</Typography>
			<NoThanksCard card={currentCard} />
			<NoThanksChips chips={currentCardCost} />

			{isMyTurn && <NoThanksMove
				game={game}
				currentUser={currentUser}
				isButtonsDisabled={isButtonsDisabled}
				makeMove={makeMove}
			/>}
		</Fragment>
	);
}

NoThanks.propTypes = {
	game: object.isRequired,
	currentUser: object.isRequired,
	isMyTurn: bool.isRequired,
	isButtonsDisabled: bool.isRequired,
	makeMove: func.isRequired,
};

NoThanks.defaultProps = {
	game: {},
	currentUser: {},
	isMyTurn: false,
	isButtonsDisabled: false,
	makeMove: () => null,
};
