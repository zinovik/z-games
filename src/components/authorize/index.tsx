// import React, { ChangeEvent, Fragment, useState } from 'react';
import React, { Fragment, useState } from 'react';
import { func, string } from 'prop-types';
// import { Modal, Paper, Typography, Tabs, Tab, Button, Input } from '@material-ui/core';
import { Modal, Paper, Typography, Button } from '@material-ui/core';

import './index.css';

export function Authorize({ serverUrl, onSignInClick, onSignUpClick }: {
  serverUrl: string,
  onSignInClick: (username: string, password: string) => void,
  onSignUpClick: (username: string, password: string) => void,
}) {

  const [isModalShow, setIsModalShow] = useState(false);
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');
  // const [isTabSignUp, setIsTabSignUp] = useState(false);

  const handleAuthorize = () => {
    setIsModalShow(true);
  };

  const handleClose = () => {
    setIsModalShow(false);
  };

  // const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setUsername(event.target.value);
  // };

  // const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setPassword(event.target.value);
  // };

  // const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setEmail(event.target.value);
  // };

  // const handleSignInClick = () => {
  //   onSignInClick(username, password);
  // };

  // const handleSignUpClick = () => {
  //   onSignUpClick(email, password);
  // };

  // const handleTabChange = () => {
  //   setIsTabSignUp(!isTabSignUp);
  // }

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
          {/* <div>
            <Input type="text" placeholder="Username" onChange={handleUsernameChange} />
          </div>

          <div>
            <Input type="password" placeholder="Password" onChange={handlePasswordChange} />
          </div>

          <Tabs
            value={isTabSignUp}
            onChange={handleTabChange}
            indicatorColor='primary'
            textColor='primary'
          >
            <Tab label='Sign in' />
            <Tab label='Sign up' />
          </Tabs>

          <div>
            <Input type='email' placeholder='Email' onChange={handleEmailChange} />
          </div>

          <Typography>
            <Button onClick={handleSignInClick}>Sign in</Button>
            <Button onClick={handleSignUpClick}>Sign up</Button>
          </Typography> */}

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
