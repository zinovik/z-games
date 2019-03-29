import React, { Fragment, ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { object, bool } from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { NoThanksData } from 'z-games-no-thanks';

import { NoThanksCard, NoThanksChips } from '../';
import { makeMove as makeMoveWithoutDispatch } from '../../../actions';
import { IGame, IUser, IState } from '../../../interfaces';

import './index.scss';

export function NoThanksPure({ game, currentUser, isMyTurn, makeMove, isButtonsDisabled }: {
	game: IGame,
	currentUser: IUser,
	isMyTurn: boolean,
	isButtonsDisabled: boolean,
	makeMove: ({ gameNumber, move }: { gameNumber: number, move: string }) => void, 
}) {
	const { gameData } = game;

	const move = (takeCard: boolean): void => {
		makeMove({ gameNumber: game.number, move: JSON.stringify({ takeCard }) });
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
				<Button variant='contained' color='primary' className='no-thanks-button' onClick={() => { move(false); }} disabled={!myChips || isButtonsDisabled}>
					Pay
				</Button>
				<Button variant='contained' color='primary' className='no-thanks-button' onClick={() => { move(true); }} disabled={isButtonsDisabled}>
					Take
				</Button>
			</div>}
		</Fragment>
	);
}

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

const mapStateToProps = (state: IState) => ({
  isButtonsDisabled: state.users.isButtonsDisabled,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  makeMove: bindActionCreators(makeMoveWithoutDispatch, dispatch),
});

export const NoThanks = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NoThanksPure as ComponentType<any>);
