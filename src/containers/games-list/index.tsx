import * as React from 'react';

import { Game } from '../../components';
import * as types from '../../constants';

interface GamesListProps extends React.Props<{}> {
	allGames: types.Game[],
	currentUsername: string | null,
	joinGame: any,
}

export class GamesList extends React.Component<GamesListProps, {}> {
	render() {
		const { allGames, currentUsername, joinGame } = this.props;

		return (
			<div>
				{[...allGames].reverse().map((game, index) => (
					<Game
						game={game}
						currentUsername={currentUsername}
						index={allGames.length - index - 1}
						join={() => { joinGame(allGames.length - index - 1); }}
						key={index}
					/>)
				)}
			</div>
		);
	}
};
