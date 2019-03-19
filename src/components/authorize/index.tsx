import React, { ChangeEvent, Fragment, useState } from 'react';
import { func, string } from 'prop-types';
import { Modal, Paper, Typography, Tabs, Tab, Button, Input } from '@material-ui/core';

import './index.scss';

export function Authorize({ serverUrl, onSignInClick, onSignUpClick }: {
  serverUrl: string,
  onSignInClick: (username: string, password: string) => void,
  onSignUpClick: (username: string, password: string, email: string) => void,
}) {

  const [isModalShow, setIsModalShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [currentTab, setCurrentTab] = useState(0);

  const handleAuthorize = () => {
    setIsModalShow(true);
  };

  const handleClose = () => {
    setIsModalShow(false);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSignInClick = () => {
    onSignInClick(username, password);
  };

  const handleSignUpClick = () => {
    onSignUpClick(username, password, email);
  };

  const handleTabChange = () => {
    setCurrentTab(currentTab ? 0 : 1);
  }

  const handleSignInGoogle = () => {
    window.location.href = `${serverUrl}/api/users/authorize/google`;
  }

  return (
    <Fragment>
      <Button onClick={handleAuthorize}>
        Sign up/in
      </Button>

      <Modal open={isModalShow} onClose={handleClose}>
        <Paper className='authorize-modal-window'>

          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            indicatorColor='primary'
            textColor='primary'
          >
            <Tab label='Sign in' />
            <Tab label='Sign up' />
          </Tabs>

          <div>
            <Input type='text' placeholder='Username' onChange={handleUsernameChange} />
          </div>

          <div>
            <Input type='password' placeholder='Password' onChange={handlePasswordChange} />
          </div>

          {currentTab === 0 && <Fragment>
            <Button onClick={handleSignInClick}>Sign in</Button>
          </Fragment>}

          {currentTab === 1 && <Fragment>
            <Input type='email' placeholder='Email' onChange={handleEmailChange} />
            <Button onClick={handleSignUpClick}>Sign up</Button>
          </Fragment>}

          <Typography>
            <Button onClick={handleSignInGoogle}>
              <img src='https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png' />
            </Button>
          </Typography>

        </Paper>
      </Modal>
    </Fragment>
  );
};

Authorize.propTypes = {
  serverUrl: string.isRequired,
  onSignInClick: func.isRequired,
  onSignUpClick: func.isRequired,
};

Authorize.defaultProps = {
  onSignInClick: () => console.log,
  onSignUpClick: () => console.log,
};
