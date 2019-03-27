import React, { Fragment, ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { object, bool } from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { LostCitiesData } from 'z-games-lost-cities';

import { makeMove as makeMoveWithoutDispatch } from '../../../actions';
import { IGame, IUser, IUsersState, IGamesState } from '../../../interfaces';

import './index.scss';

export function LostCitiesPure({ game, currentUser, isMyTurn, makeMove, isButtonsDisabled }: {
	game: IGame,
	currentUser: IUser,
	isMyTurn: boolean,
	isButtonsDisabled: boolean,
	makeMove: ({ gameNumber, move }: { gameNumber: number, move: string }) => void, 
}) {
	const { gameData } = game;

	const movePay = (): void => {
		makeMove({ gameNumber: game.number, move: JSON.stringify({ takeCard: false }) });
	};

	const moveTake = (): void => {
		makeMove({ gameNumber: game.number, move: JSON.stringify({ takeCard: true }) });
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

const mapStateToProps = (state: { users: IUsersState, games: IGamesState }) => ({
	isButtonsDisabled: state.users.isButtonsDisabled,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  makeMove: bindActionCreators(makeMoveWithoutDispatch, dispatch),
});

export const LostCities = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LostCitiesPure as ComponentType<any>);
