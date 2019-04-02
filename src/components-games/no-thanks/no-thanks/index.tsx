import React, { Fragment } from 'react';
import { object, bool } from 'prop-types';
import { Typography } from '@material-ui/core';
import { INoThanksData } from 'z-games-no-thanks';

import { NoThanksMove, NoThanksCard, NoThanksChips } from '../';
import { IGame, IUser } from '../../../interfaces';

export function NoThanks({ game, currentUser, isMyTurn }: {
	game: IGame,
	currentUser: IUser,
	isMyTurn: boolean,
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
			/>}
		</Fragment>
	);
}

NoThanks.propTypes = {
	game: object.isRequired,
	currentUser: object.isRequired,
	isMyTurn: bool.isRequired,
};

NoThanks.defaultProps = {
	game: {},
	currentUser: {},
	isMyTurn: false,
};
