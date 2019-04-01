import React, { ChangeEvent, Fragment, useState, ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Modal, Paper, Typography, Tabs, Tab, Button, TextField, FormHelperText } from '@material-ui/core';

import { Loading } from '../';
import {
  register as registerWithoutDispatch,
  authorize as authorizeWithoutDispatch,
} from '../../actions';
import { SERVER_URL } from '../../config';

import './index.scss';

function AuthorizePure({ register, authorize }: {
  register: (username: string, password: string, email: string) => Promise<void>,
  authorize: (username: string, password: string) => Promise<void>,
}) {
  const [isModalShow, setIsModalShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);

  const handleAuthorize = () => {
    setIsModalShow(true);
  };

  const handleClose = () => {
    setIsModalShow(false);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isValidated) {
      validate();
    }

    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isValidated) {
      validate();
    }

    setPassword(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isValidated) {
      validate();
    }

    setEmail(event.target.value);
  };

  const handleSignInClick = async () => {
    setIsLoading(true);
    await authorize(username, password);
    setIsLoading(false);
  };

  const handleSignUpClick = async () => {
    if (!validate()) {
      return;
    }

    setIsLoading(true);
    await register(username, password, email);
    setIsLoading(false);
    setIsModalShow(false);
  };

  const handleTabChange = () => {
    setIsValidated(false);

    setCurrentTab(currentTab ? 0 : 1);
  };

  const handleSignInGoogle = () => {
    window.location.href = `${SERVER_URL}/api/users/authorize/google`;
  };

  const validate = (): boolean => {
    setIsValidated(true);

    const isUsernameOk = /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username);
    const isPasswordOk = /[0-9a-zA-Z]{6,20}/.test(password);
    const isEmailOk =
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(email);

    setIsUsernameError(!isUsernameOk);
    setIsPasswordError(!isPasswordOk);
    setIsEmailError(!isEmailOk);

    return isUsernameOk && isPasswordOk && isEmailOk;
  };

  return (
    <Fragment>
      <Button onClick={handleAuthorize}>
        Sign up/in
      </Button>

      <Modal open={isModalShow} onClose={handleClose} className='authorize-modal'>
        <Paper className='authorize-modal-paper'>

          <div className='authorize-modal-tabs'>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              indicatorColor='primary'
              textColor='primary'
            >
              <Tab label='Sign in' />
              <Tab label='Sign up' />
            </Tabs>
          </div>

          <form className='authorize-modal-form'>
            <div>
              <TextField
                type='text'
                placeholder='Username'
                onChange={handleUsernameChange}
              />
              {isValidated && isUsernameError && <FormHelperText>You can't use this username</FormHelperText>}
            </div>

            <div>
              <TextField
                type='password'
                placeholder='Password'
                onChange={handlePasswordChange}
              />
              {isValidated && isPasswordError && <FormHelperText>You can't use this password</FormHelperText>}
            </div>

            {currentTab === 0 && <div className='authorize-modal-form-button'>
              <Button variant='contained' color='primary' onClick={handleSignInClick}>Sign in</Button>
            </div>}

            {currentTab === 1 && <Fragment>
              <div>
                <TextField
                  type='email'
                  placeholder='Email'
                  onChange={handleEmailChange}
                />
                {isValidated && isEmailError && <FormHelperText>Error! Email isn't valid</FormHelperText>}
              </div>
              <div className='authorize-modal-form-button'>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleSignUpClick}
                  disabled={isValidated && (isUsernameError || isPasswordError || isEmailError)}>
                  Sign up
                </Button>
              </div>
            </Fragment>}

            <Typography>
              <Button onClick={handleSignInGoogle}>
                <img src='/images/btn_google_signin_dark_normal_web.png' />
              </Button>
            </Typography>
          </form>

        </Paper>
      </Modal>

      {isLoading && <Loading />}
    </Fragment>
  );
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  register: bindActionCreators(registerWithoutDispatch, dispatch),
  authorize: bindActionCreators(authorizeWithoutDispatch, dispatch),
});

export const Authorize = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorizePure as ComponentType<any>);
