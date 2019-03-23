import React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import { Header, Loading } from '../../components';
import * as types from '../../constants';

import './index.scss';

function RulesPageWithoutState({ currentUser, isConnected, usersOnline }: {
  currentUser: types.IUser,
  isConnected: boolean,
  usersOnline: types.IUsersOnline,
}) {
  return (
    <main className='rules-page-container'>
      <Header
        currentUsername={currentUser && currentUser.username}
        avatar={currentUser && currentUser.avatar}
        usersOnline={usersOnline}
      />

      <div className='rules-page-content'>
        <div className='rules-page-data'>
          <Typography variant='h5'>
            No, Thanks
          </Typography>

          <Typography variant='h5'>
            Perudo
          </Typography>
        </div>
      </div>

      <Loading isConnected={isConnected} text='Connecting to the server...' />
    </main>
  );
}

const mapStateToProps = (state: { users: types.IUsersState, games: types.IGamesState }) => {
  return {
    usersOnline: state.users.usersOnline,
    isConnected: state.users.isConnected,
    currentUser: state.users.currentUser,
  };
};

const mapDispatchToProps = {
};

export const RulesPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RulesPageWithoutState);
