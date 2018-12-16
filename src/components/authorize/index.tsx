import React, { Component, ChangeEvent, Props, Fragment } from 'react';
import { func, string } from 'prop-types';
// import { Modal, Paper, Typography, Tabs, Tab, Button, Input } from '@material-ui/core';
import { Modal, Paper, Typography, Button } from '@material-ui/core';

import './index.css';

interface AuthorizeProps extends Props<{}> {
  serverUrl: string,
  onSignInClick: (username: string, password: string) => void,
  onSignUpClick: (username: string, password: string) => void,
}

interface AuthorizeState extends Props<{}> {
  isModalShow: boolean,
  username: string,
  password: string,
  email: string,
  isTabSignUp: boolean,
}

export class Authorize extends Component<AuthorizeProps, AuthorizeState> {
  static propTypes = {
    serverUrl: string.isRequired,
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
    email: '',
    isTabSignUp: false,
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

  handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value });
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

  handleTabChange = () => {
    const { isTabSignUp } = this.state;

    this.setState({ isTabSignUp: !isTabSignUp });
  }

  handleSignInGoogle = () => {
    const { serverUrl } = this.props;

    window.location.href = `${serverUrl}/api/users/authorize/google`;
  }

  render() {
    return (
      <Fragment>
        <Button onClick={this.handleAuthorize}>
          Sign up/in
        </Button>

        <Modal open={this.state.isModalShow} onClose={this.handleClose}>
          <Paper className='authorize-modal-window'>
            {/* <div>
              <Input type="text" placeholder="Username" onChange={this.handleUsernameChange} />
            </div>

            <div>
              <Input type="password" placeholder="Password" onChange={this.handlePasswordChange} />
            </div> */}

            {/* <Tabs
              value={this.state.isTabSignUp}
              onChange={this.handleTabChange}
              indicatorColor='primary'
              textColor='primary'
            >
              <Tab label='Sign in' />
              <Tab label='Sign up' />
            </Tabs>

            <div>
              <Input type='email' placeholder='Email' onChange={this.handleEmailChange} />
            </div> */}

            {/* <Typography>
              <Button onClick={this.handleSignInClick}>Sign in</Button>
              <Button onClick={this.handleSignUpClick}>Sign up</Button>
            </Typography> */}

            <Typography>
              <Button onClick={this.handleSignInGoogle}>
                <img src='https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png' />
              </Button>
            </Typography>

          </Paper>
        </Modal>
      </Fragment>
    );
  }
}
