import React, { Fragment } from 'react';
import { object, bool, func } from 'prop-types';
import { Typography } from '@material-ui/core';
import { ISixNimmtData } from 'z-games-six-nimmt';

import { SixNimmtCard } from './six-nimmt-card';
import { SixNimmtMove } from './six-nimmt-move';
import { IGame, IUser } from '../../../interfaces';

import './index.scss';

export function SixNimmt({ game, currentUser, isMyTurn, isButtonsDisabled, makeMove }: {
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

	const { cardsLeft, cardsTable, currentRound, currentRoundMove }: ISixNimmtData = JSON.parse(gameData);

	return (
		<Fragment>

			<Typography>
				Cards left: {cardsLeft}
			</Typography>

			<Typography>
				Round: {currentRound}
			</Typography>

			<Typography>
				Round Move: {currentRoundMove}
			</Typography>

			<Typography>
				Cards left: {cardsLeft}
			</Typography>

			{cardsTable && cardsTable.map((cards, rowIndex) => (
				<div className='six-nimmt-cards-table' key={`table-cards-row-${rowIndex}`}>
					{cards && cards.map(({ cardNumber, cattleHeads }, cardIndex) => (
						<SixNimmtCard
							cardNumber={cardNumber}
							cattleHeads={cattleHeads}
							key={`table-card-${cardIndex}`}
						/>
					))}
				</div>
			))}

			{isMyTurn && <SixNimmtMove
				game={game}
				currentUser={currentUser}
				isButtonsDisabled={isButtonsDisabled}
				makeMove={makeMove}
			/>}
		</Fragment>
	);
}

SixNimmt.propTypes = {
	game: object.isRequired,
	currentUser: object.isRequired,
	isMyTurn: bool.isRequired,
	isButtonsDisabled: bool.isRequired,
	makeMove: func.isRequired,
};

SixNimmt.defaultProps = {
	game: {},
	currentUser: {},
	isMyTurn: false,
	isButtonsDisabled: false,
	makeMove: () => null,
};
