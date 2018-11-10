import * as React from 'react';

import * as types from '../../constants';

interface NoThanksProps extends React.Props<{}> {
	game: types.Game,
	currentUsername: string | null,
	move: any,
}

export class NoThanks extends React.Component<NoThanksProps, {}> {
	render() {
		return (
			<div>
			</div>
		);
	}
};
