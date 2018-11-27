import * as React from 'react';

import { Game } from '../../components';
import * as types from '../../constants';

interface GamesListProps extends React.Props<{}> {
	allGames: types.Game[],
	currentUsername: string | null,
	joinGame: (gameNumber: number) => void,
	openGame: (gameNumber: number) => void,
	watchGame: (gameNumber: number) => void,
}

export class GamesList extends React.Component<GamesListProps, {}> {
	render() {
		const { allGames, currentUsername, joinGame, openGame, watchGame } = this.props;

		return (
			<div>
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
	}
};
