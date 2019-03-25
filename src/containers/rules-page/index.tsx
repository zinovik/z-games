import React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import { Header, Loading } from '../../components';
import * as types from '../../constants';

import './index.scss';

function RulesPagePure({ isConnected }: {
  isConnected: boolean,
}) {
  return (
    <main className='rules-page-container'>
      <Header />

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

const mapStateToProps = (state: { users: types.IUsersState, games: types.IGamesState }) => ({
  isConnected: state.users.isConnected,
});

const mapDispatchToProps = () => ({
});

export const RulesPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RulesPagePure);
