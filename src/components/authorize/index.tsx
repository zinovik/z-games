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

  render() {
    const { onSignInClick, onSignUpClick } = this.props;
    const { username, password } = this.state;

    return (
      <div>
        <Input type="email" placeholder="Username" onChange={this.handleUsernameChange} />
        <Input type="password" placeholder="Password" onChange={this.handlePasswordChange} />
        <Button variant='contained' color='primary' onClick={() => { onSignInClick(username, password); }}>Sign in</Button>
        <Button variant='contained' color='primary' onClick={() => { onSignUpClick(username, password); }}>Sign up</Button>
      </div>
    );
  }
}
