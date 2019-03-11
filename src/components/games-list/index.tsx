import React, { Fragment, useState } from 'react';
import { string, array, func } from 'prop-types';
import { Typography, Checkbox } from '@material-ui/core';

import { Game } from '../../components';
import * as types from '../../constants';
import './index.css';

export function GamesList({ allGames, currentUsername, joinGame, openGame, watchGame }: {
	allGames: types.Game[],
	currentUsername: string | undefined,
	joinGame: (gameNumber: number) => void,
	openGame: (gameNumber: number) => void,
	watchGame: (gameNumber: number) => void,
}) {
	const [isNotStarted, setIsNotStarted] = useState(true);
	const [isStarted, setIsStarted] = useState(true);
	const [isFinished, setIsFinished] = useState(false);
	const [disableButtons, setDisableButtons] = useState(false);

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
				((isNotStarted && game.state === types.GAME_NOT_STARTED)
					|| (isStarted && game.state === types.GAME_STARTED)
					|| (isFinished && game.state === types.GAME_FINISHED)) && <Game
					game={game}
					currentUsername={currentUsername}
					isDisableButtons={disableButtons}
					join={() => { joinGame(game.number); }}
					open={() => { openGame(game.number); }}
					watch={() => { watchGame(game.number); }}
					disableButtons={() => { setDisableButtons(true); }}
					key={index}
				/>)
			)}
		</div>
	</Fragment>;
};

GamesList.propTypes = {
	newMessage: string.isRequired,
	allGames: array.isRequired,
	currentUsername: string,
	joinGame: func.isRequired,
	openGame: func.isRequired,
	watchGame: func.isRequired,
};

GamesList.defaultProps = {
	newMessage: '',
	allGames: [],
	currentUsername: undefined,
	joinGame: () => console.log,
	openGame: () => console.log,
	watchGame: () => console.log,
};
