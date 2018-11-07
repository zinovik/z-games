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
		return (
			<div>
				{this.props.allGames.map((game, index) => (
					<Game
						game={game}
						currentUsername={this.props.currentUsername}
						index={index}
						join={() => { this.props.joinGame(index); }}
						key={index}
					/>)
				)}
			</div>
		);
	}
};
