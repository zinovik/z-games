import React, { Fragment, useState, ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { object, bool } from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { LostCitiesData } from 'z-games-lost-cities';

import { makeMove } from '../../../actions';
import { IGame, IUser } from '../../../interfaces';

import './index.scss';

export function LostCitiesPure({ game, currentUser, isMyTurn, move }: {
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

	const { cards, discards, cardsLeft, players: playersInGame }: LostCitiesData = JSON.parse(gameData);

	const currentPlayerInGame = playersInGame.find(playerInGame => playerInGame.id === currentUser.id);
	const myChips = currentPlayerInGame && currentPlayerInGame;

	return (
		<Fragment>

			<Typography>
				Cards left: {cardsLeft}
			</Typography>

			<Typography>
				Cards: {cards.join(', ')}
			</Typography>

			<Typography>
				Discards: {discards.join(', ')}
			</Typography>

			{isMyTurn && <div className='lost-cities-buttons'>
				<Button variant='contained' color='primary' className='lost-cities-button' onClick={movePay} disabled={!myChips || isButtonsDisabled}>
					Pay
				</Button>
				<Button variant='contained' color='primary' className='lost-cities-button' onClick={moveTake} disabled={isButtonsDisabled}>
					Take
				</Button>
			</div>}
		</Fragment>
	);
};

LostCitiesPure.propTypes = {
	game: object.isRequired,
	currentUser: object.isRequired,
	isMyTurn: bool.isRequired,
};

LostCitiesPure.defaultProps = {
	game: {},
	currentUser: {},
	isMyTurn: false,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  move: bindActionCreators(makeMove, dispatch),
});

export const LostCities = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LostCitiesPure as ComponentType<any>);
