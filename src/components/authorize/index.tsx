import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Button, Input } from '@material-ui/core';

interface AuthorizeProps extends React.Props<{}> {
  onSignInClick: any,
  onSignUpClick: any,
}

export class Authorize extends React.Component<AuthorizeProps, {}> {
  static propTypes = {
    onSignInClick: PropTypes.func.isRequired,
    onSignUpClick: PropTypes.func.isRequired,
  }

  state = {
    username: '',
    password: '',
  };

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSignInClick = () => {
    const { onSignInClick } = this.props;
    const { username, password } = this.state;

    onSignInClick(username, password);
  };

  handleSignUpClick = () => {
    const { onSignUpClick } = this.props;
    const { username, password } = this.state;

    onSignUpClick(username, password);
  };

  render() {
    return (
      <div>
        <Input type="text" placeholder="Username" onChange={this.handleUsernameChange} />
        <Input type="password" placeholder="Password" onChange={this.handlePasswordChange} />
        <Button variant='contained' color='primary' onClick={this.handleSignInClick}>Sign in</Button>
        <Button variant='contained' color='primary' onClick={this.handleSignUpClick}>Sign up</Button>
      </div>
    );
  }
}
