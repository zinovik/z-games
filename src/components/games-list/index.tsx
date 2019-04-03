import React, { Fragment, useState } from 'react';
import { string, array, bool, func } from 'prop-types';
import { Typography, Checkbox } from '@material-ui/core';
import { GAME_NOT_STARTED, GAME_STARTED, GAME_FINISHED } from 'z-games-base-game';

import { Game } from './game';
import { IGame } from '../../interfaces';

import './index.scss';

export function GamesList({ allGames, currentUsername, isButtonsDisabled, joinGame, openGame, watchGame }: {
	allGames: IGame[],
	currentUsername?: string,
	isButtonsDisabled: boolean,
	joinGame: (gameNumber: number) => void,
	openGame: (gameNumber: number) => void,
	watchGame: (gameNumber: number) => void,
}) {
	const [isNotStarted, setIsNotStarted] = useState(true);
	const [isStarted, setIsStarted] = useState(true);
	const [isFinished, setIsFinished] = useState(false);

	const handleNotStarted = (): void => {
		setIsNotStarted(!isNotStarted);
	}

	const handleStarted = (): void => {
		setIsStarted(!isStarted);
	}

	const handleFinished = (): void => {
		setIsFinished(!isFinished);
	}

	return <Fragment>
		<Typography>
			<Checkbox checked={isNotStarted} onChange={handleNotStarted} />
			Not Started
			<Checkbox checked={isStarted} onChange={handleStarted} />
			Started
			<Checkbox checked={isFinished} onChange={handleFinished} />
			Finished
		</Typography>

		<div className='games-list'>
			{allGames.map((game, index) => (
				((isNotStarted && game.state === GAME_NOT_STARTED)
					|| (isStarted && game.state === GAME_STARTED)
					|| (isFinished && game.state === GAME_FINISHED)) && <Game
					game={game}
					currentUsername={currentUsername}
					key={`game${index}`}
					isButtonsDisabled={isButtonsDisabled}
					joinGame={joinGame}
					openGame={openGame}
					watchGame={watchGame}
				/>)
			)}
		</div>
	</Fragment>;
};

GamesList.propTypes = {
	newMessage: string.isRequired,
	allGames: array.isRequired,
	isButtonsDisabled: bool.isRequired,
	currentUsername: string,
	joinGame: func.isRequired,
	openGame: func.isRequired,
	watchGame: func.isRequired,
};

GamesList.defaultProps = {
	newMessage: '',
	allGames: [],
	isButtonsDisabled: false,
	joinGame: () => null,
	openGame: () => null,
	watchGame: () => null,
};
