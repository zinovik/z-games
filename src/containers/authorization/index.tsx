import * as React from 'react';

import Authorize from '../../components/authorize';
import CurrentUser from '../../components/current-user';

interface AuthorizationProps extends React.Props<{}> {
	currentUsername: string,
	signIn: Function,
	signUp: Function,
	logOut: Function,
}

export class Authorization extends React.Component<AuthorizationProps, {}> {
	render() {
		return (
			<div>
				{!this.props.currentUsername &&
					<Authorize onSignInClick={this.props.signIn} onSignUpClick={this.props.signUp} />
				}
				{this.props.currentUsername &&
					<CurrentUser currentUsername={this.props.currentUsername} onLogOutClick={this.props.logOut} />
				}
			</div>
		);
	}
};
