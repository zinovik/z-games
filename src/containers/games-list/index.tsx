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
				{allGames.map((game, index) => (
					<Game
						game={game}
						currentUsername={currentUsername}
						index={index}
						join={() => { joinGame(index); }}
						key={index}
					/>)
				)}
			</div>
		);
	}
};
