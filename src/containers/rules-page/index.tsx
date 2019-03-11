import React, { Component, Props } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import Header from '../../components/header';
import { Loading } from '../../components';
import { ZGamesApi } from '../../services';
import * as types from '../../constants';
import './index.css';

interface RulesPageProps extends Props<{}> {
  currentUser: types.User,
  isConnected: boolean,
  allGames: types.Game[],
  usersOnline: types.User[],
}

class RulesPage extends Component<RulesPageProps, {}> {
  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  render() {
    const { isConnected, currentUser, usersOnline } = this.props;

    return (
      <main className='rules-page-container'>
        <Header
          currentUsername={currentUser && currentUser.username}
          avatar={currentUser && currentUser.avatar}
          serverUrl={this.zGamesApi.SERVER_URL}
          signUp={this.zGamesApi.register}
          signIn={this.zGamesApi.login}
          logOut={this.zGamesApi.logout}
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

        <Loading isConnected={isConnected} />
      </main>
    );
  }
}

const mapStateToProps = (state: { users: types.UsersState, games: types.GamesState }) => {
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
