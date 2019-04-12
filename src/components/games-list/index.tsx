import React, { Fragment, useEffect, useState } from 'react';
import { string, object, array, bool, func } from 'prop-types';
import { GAME_NOT_STARTED, GAME_STARTED, GAME_FINISHED } from 'z-games-base-game';
import { Button } from '@material-ui/core';

import { BackToTop } from './back-to-top';
import { GamesFilter } from './games-filter';
import { Game } from './game';
import { IGame, IUser, IFilterSettings } from '../../interfaces';

import './index.scss';

export function GamesList({ allGames, currentUser, isButtonsDisabled, filterSettings, joinGame, openGame, watchGame, updateFilterSettings }: {
	allGames: IGame[],
	currentUser?: IUser,
	isButtonsDisabled: boolean,
	filterSettings: IFilterSettings,
	joinGame: (gameNumber: number) => void,
	openGame: (gameNumber: number) => void,
	watchGame: (gameNumber: number) => void,
	updateFilterSettings: (filterSettings: IFilterSettings) => void,
}) {
	const [isBackToTop, setIsBackToTop] = useState(false);
	const [isFilterShown, setIsFilterShown] = useState(false);

	const { isNotStarted, isStarted, isFinished, isWithMe, isWithoutMe, isMyMove, isNotMyMove, isGames } = filterSettings;

	const handleFilterButtonClick = () => {
		setIsFilterShown(!isFilterShown);
	};

	const updateIsBackToTop = () => {
		setIsBackToTop(window.pageYOffset > 100);
	};

	useEffect(() => {
		window.addEventListener('scroll', updateIsBackToTop);

		return function cleanup() {
			window.removeEventListener('scroll', updateIsBackToTop);
		};
	});

	// TODO: Move filter to the back-end

	return <Fragment>

		{isBackToTop && <BackToTop />}

		{isFilterShown && <Fragment>
			<Button onClick={handleFilterButtonClick}>
				Hide Filter
			</Button>
			<GamesFilter
				filterSettings={filterSettings}
				currentUser={currentUser}
				updateFilterSettings={updateFilterSettings}
			/>
		</Fragment>
		}

		{!isFilterShown && <Button onClick={handleFilterButtonClick}>
			Show Filter
		</Button>}

		<div className='games-list'>
			{allGames.map((game, index) => (
				(
					(isNotStarted && game.state === GAME_NOT_STARTED)
					|| (isStarted && game.state === GAME_STARTED)
					|| (isFinished && game.state === GAME_FINISHED)
				) && isGames[game.name] && (
					(isWithoutMe && (!currentUser || !game.players || !game.players.some(gamePlayer => gamePlayer.id === currentUser.id)))
					|| (isWithMe && currentUser && game.players && game.players.some(gamePlayer => gamePlayer.id === currentUser.id))
				) && (
					(isNotMyMove && (!currentUser || !game.nextPlayers || !game.nextPlayers.some(gamePlayer => gamePlayer.id === currentUser.id)))
					|| (isMyMove && currentUser && game.nextPlayers && game.nextPlayers.some(gamePlayer => gamePlayer.id === currentUser.id))
				) && <Game
					game={game}
					currentUser={currentUser}
					key={`game${index}`}
					isButtonsDisabled={isButtonsDisabled}
					joinGame={joinGame}
					openGame={openGame}
					watchGame={watchGame}
				/>)
			)}
		</div>
	</Fragment>;
}

GamesList.propTypes = {
	newMessage: string.isRequired,
	allGames: array.isRequired,
	isButtonsDisabled: bool.isRequired,
	filterSettings: object.isRequired,
	currentUser: object,
	joinGame: func.isRequired,
	openGame: func.isRequired,
	watchGame: func.isRequired,
	updateFilterSettings: func.isRequired,
};

GamesList.defaultProps = {
	newMessage: '',
	allGames: [],
	isButtonsDisabled: false,
	filterSettings: {},
	joinGame: () => null,
	openGame: () => null,
	watchGame: () => null,
	updateFilterSettings: () => null,
};
