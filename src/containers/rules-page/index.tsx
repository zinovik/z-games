import React, { Component, Props } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import Header from '../../components/header';
import { Loading } from '../../components';
import * as types from '../../constants';
import './index.scss';

interface IRulesPageProps extends Props<{}> {
  currentUser: types.IUser,
  isConnected: boolean,
  allGames: types.IGame[],
  usersOnline: types.IUser[],
}

class RulesPage extends Component<IRulesPageProps, {}> {
  render() {
    const { isConnected, currentUser, usersOnline } = this.props;

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
}

const mapStateToProps = (state: { users: types.IUsersState, games: types.IGamesState }) => {
  return {
    usersOnline: state.users.usersOnline,
    isConnected: state.users.isConnected,
    currentUser: state.users.currentUser,
    allGames: state.games.allGames,
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RulesPage);
