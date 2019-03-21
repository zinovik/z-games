import React, { Fragment, useState } from 'react';
import { object, bool } from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { NoThanksData } from 'z-games-no-thanks';

import { NoThanksCard, NoThanksChips } from '../';
import { makeMove } from '../../../services';
import * as types from '../../../constants';

import './index.scss';

export function NoThanks({ game, currentUser, isMyTurn }: {
	game: types.IGame,
	currentUser: types.IUser,
	isMyTurn: boolean,
}) {
	const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);
	const [oldGameData, setOldGameData] = useState('');

	const { gameData } = game;

	if (gameData !== oldGameData) {
		setIsButtonsDisabled(false);
		setOldGameData(gameData);
	}

	const movePay = (): void => {
		makeMove({ gameNumber: game.number, move: JSON.stringify({ takeCard: false }) });

		setIsButtonsDisabled(true);
	};

	const moveTake = (): void => {
		makeMove({ gameNumber: game.number, move: JSON.stringify({ takeCard: true }) });

		setIsButtonsDisabled(true);
	};

	if (!currentUser) {
		return null;
	}

	const { currentCard, currentCardCost, cardsLeft, players: playersInGame }: NoThanksData = JSON.parse(gameData);

	const currentPlayerInGame = playersInGame.find(playerInGame => playerInGame.id === currentUser.id);
	const myChips = currentPlayerInGame && currentPlayerInGame.chips;

	return (
		<Fragment>

			<Typography>
				Cards left: {cardsLeft}
			</Typography>
			<NoThanksCard card={currentCard} />
			<NoThanksChips chips={currentCardCost} />

			{isMyTurn && <div className='no-thanks-buttons'>
				<Button variant='contained' color='primary' className='no-thanks-button' onClick={movePay} disabled={!myChips || isButtonsDisabled}>
					Pay
				</Button>
				<Button variant='contained' color='primary' className='no-thanks-button' onClick={moveTake} disabled={isButtonsDisabled}>
					Take
				</Button>
			</div>}
		</Fragment>
	);
};

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
