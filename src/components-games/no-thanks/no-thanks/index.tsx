import React, { Fragment, useState, ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { object, bool } from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { NoThanksData } from 'z-games-no-thanks';

import { NoThanksCard, NoThanksChips } from '../';
import { makeMove } from '../../../actions';
import { IGame, IUser } from '../../../interfaces';

import './index.scss';

export function NoThanksPure({ game, currentUser, isMyTurn, move }: {
	game: IGame,
	currentUser: IUser,
	isMyTurn: boolean,
	move: ({ gameNumber, move }: { gameNumber: number, move: string }) => void, 
}) {
	const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);
	const [oldGameData, setOldGameData] = useState('');

	const { gameData } = game;

	if (gameData !== oldGameData) {
		setIsButtonsDisabled(false);
		setOldGameData(gameData);
	}

	const movePay = (): void => {
		move({ gameNumber: game.number, move: JSON.stringify({ takeCard: false }) });

		setIsButtonsDisabled(true);
	};

	const moveTake = (): void => {
		move({ gameNumber: game.number, move: JSON.stringify({ takeCard: true }) });

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

NoThanksPure.propTypes = {
	game: object.isRequired,
	currentUser: object.isRequired,
	isMyTurn: bool.isRequired,
};

NoThanksPure.defaultProps = {
	game: {},
	currentUser: {},
	isMyTurn: false,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  move: bindActionCreators(makeMove, dispatch),
});

export const NoThanks = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoThanksPure as ComponentType<any>);
