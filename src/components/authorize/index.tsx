import React, { ChangeEvent, Fragment, useState, ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Modal, Paper, Typography, Tabs, Tab, Button, TextField } from '@material-ui/core';

import { Loading } from '../';
// import { Loading, Notification } from '../';
import { register, authorize } from '../../actions';
import { SERVER_URL } from '../../config';

import './index.scss';

function AuthorizePure({ registerUser, authorizeUser }: {
  registerUser: (username: string, password: string, email: string) => Promise<void>,
  authorizeUser: (username: string, password: string) => Promise<void>,
}) {
  const [isModalShow, setIsModalShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSignInClick = async () => {
    setIsLoading(true);

    try {
      await authorizeUser(username, password);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpClick = async () => {
    setIsLoading(true);

    try {
      await registerUser(username, password, email);
      alert('Check email to activate your account');
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = () => {
    setCurrentTab(currentTab ? 0 : 1);
  }

  const handleSignInGoogle = () => {
    window.location.href = `${SERVER_URL}/api/users/authorize/google`;
  }

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
            </div>

            <div>
              <TextField
                type='password'
                placeholder='Password'
                onChange={handlePasswordChange}
              />
            </div>

            {currentTab === 0 && <div className='authorize-modal-form-button'>
              <Button variant='contained' color='primary' onClick={handleSignInClick}>Sign in</Button>
            </div>}

            {currentTab === 1 && <Fragment>
              <TextField
                type='email'
                placeholder='Email'
                onChange={handleEmailChange}
              />
              <div className='authorize-modal-form-button'>
                <Button variant='contained' color='primary' onClick={handleSignUpClick}>Sign up</Button>
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

      {/* <Notification /> */}
    </Fragment>
  );
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  registerUser: bindActionCreators(register, dispatch),
  authorizeUser: bindActionCreators(authorize, dispatch),
});

export const Authorize = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorizePure as ComponentType<any>);
