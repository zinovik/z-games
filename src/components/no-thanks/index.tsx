import React, { Fragment, useState } from 'react';
import { object, bool, func } from 'prop-types';
import { Button, Typography } from '@material-ui/core';

import { NoThanksCard, NoThanksChips } from '../../components';
import * as types from '../../constants';
import './index.css';

export function NoThanks({ game, currentUser, isMyTurn, move }: {
	game: types.Game,
	currentUser: types.User,
	isMyTurn: boolean,
	move: (move: string) => void,
}) {
	const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);
	const [oldGameData, setOldGameData] = useState('');

	const { gameData } = game;

	if (gameData !== oldGameData) {
		setIsButtonsDisabled(false);
		setOldGameData(gameData);
	}

	const movePay = (): void => {
		move(JSON.stringify({ takeCard: false }));

		setIsButtonsDisabled(true);
	};

	const moveTake = (): void => {
		move(JSON.stringify({ takeCard: true }));

		setIsButtonsDisabled(true);
	};

	if (!currentUser) {
		return null;
	}

	const { currentCard, currentCardCost, cardsLeft, players: playersInGame } = JSON.parse(gameData);

	const currentPlayerInGame = playersInGame.find((playerInGame: types.PlayerInGame) => playerInGame.id === currentUser.id);
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
	move: func.isRequired,
};

NoThanks.defaultProps = {
	game: {},
	currentUser: {},
	isMyTurn: false,
	move: () => console.log,
};
