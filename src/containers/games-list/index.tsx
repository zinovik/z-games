import React from 'react';
import { string, array, func } from 'prop-types';

import { Game } from '../../components';
import * as types from '../../constants';
import './index.css';

export const GamesList = ({ allGames, currentUsername, joinGame, openGame, watchGame }: {
	allGames: types.Game[],
	currentUsername: string | undefined,
	joinGame: (gameNumber: number) => void,
	openGame: (gameNumber: number) => void,
	watchGame: (gameNumber: number) => void,
}) => {
	return (
		<div className='games-list'>
			{allGames.map((game, index) => (
				<Game
					game={game}
					currentUsername={currentUsername}
					join={() => { joinGame(game.number); }}
					open={() => { openGame(game.number); }}
					watch={() => { watchGame(game.number); }}
					key={index}
				/>)
			)}
		</div>
	);
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
