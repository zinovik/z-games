import * as React from 'react';

import * as types from '../../constants';

interface PerudoProps extends React.Props<{}> {
	game: types.Game,
	currentUsername: string | null,
	move: any,
}

export class Perudo extends React.Component<PerudoProps, {}> {
	render() {
		return (
			<div>
			</div>
		);
	}
};
