import * as React from 'react';

import { Authorize, CurrentUser } from '../../components';

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
