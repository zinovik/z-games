import React, { Component, ChangeEvent, Props } from 'react';
import { func } from 'prop-types';
import { Modal, Button, Input } from '@material-ui/core';

interface AuthorizeProps extends Props<{}> {
  onSignInClick: (username: string, password: string) => void,
  onSignUpClick: (username: string, password: string) => void,
}

export class Authorize extends Component<AuthorizeProps, {}> {
  static propTypes = {
    onSignInClick: func.isRequired,
    onSignUpClick: func.isRequired,
  }

  static defaultProps = {
    onSignInClick: () => console.log,
    onSignUpClick: () => console.log,
  }

  public state = {
    isModalShow: false,
    username: '',
    password: '',
  };

  handleAuthorize = () => {
    this.setState({ isModalShow: true });
  };

  handleClose = () => {
    this.setState({ isModalShow: false });
  };

  handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
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
        <Button onClick={this.handleAuthorize}>
          Sign up/in
        </Button>

        <Modal open={this.state.isModalShow} onClose={this.handleClose}>
          <div>
            <Input type="text" placeholder="Username" onChange={this.handleUsernameChange} />
            <Input type="password" placeholder="Password" onChange={this.handlePasswordChange} />
            <Button variant='contained' onClick={this.handleSignInClick}>Sign in</Button>
            <Button variant='contained' onClick={this.handleSignUpClick}>Sign up</Button>
          </div>
        </Modal>
      </div>
    );
  }
}
