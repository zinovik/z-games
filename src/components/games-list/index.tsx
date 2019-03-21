import React, { Fragment, useState } from 'react';
import { string, array } from 'prop-types';
import { Typography, Checkbox } from '@material-ui/core';
import { GAME_NOT_STARTED, GAME_STARTED, GAME_FINISHED } from 'z-games-base-game';

import { Game } from '../../components';
import * as types from '../../constants';

import './index.scss';

export function GamesList({ allGames, currentUsername }: {
	allGames: types.IGame[],
	currentUsername: string | undefined,
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
				((isNotStarted && game.state === GAME_NOT_STARTED)
					|| (isStarted && game.state === GAME_STARTED)
					|| (isFinished && game.state === GAME_FINISHED)) && <Game
					game={game}
					currentUsername={currentUsername}
					isDisableButtons={disableButtons}
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
};

GamesList.defaultProps = {
	newMessage: '',
	allGames: [],
	currentUsername: undefined,
};
