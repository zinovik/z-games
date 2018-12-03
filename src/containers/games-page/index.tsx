import React, { Component, Props } from 'react';
import { connect } from "react-redux";

import { GamesList } from '../../containers';
import { Header, UsersOnline, NewGame } from '../../components';
import { ZGamesApi } from '../../services';
import * as types from '../../constants';

interface GamesPageProps extends Props<{}> {
  currentUser: types.User,
  isConnected: boolean,
  allGames: types.Game[],
  usersOnline: types.User[],
}

class GamesPage extends Component<GamesPageProps, {}> {
  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  render() {
    const { isConnected, currentUser, allGames, usersOnline } = this.props;

    return (
      <div>
        <Header
          isConnected={isConnected}
          currentUsername={currentUser && currentUser.username}
          signUp={this.zGamesApi.register}
          signIn={this.zGamesApi.login}
          logOut={this.zGamesApi.logout}
        />

        {currentUser && <NewGame newGame={this.zGamesApi.newGame} />}

        <GamesList
          allGames={allGames}
          currentUsername={currentUser && currentUser.username}
          joinGame={this.zGamesApi.joinGame}
          openGame={this.zGamesApi.openGame}
          watchGame={this.zGamesApi.watchGame}
        />

        <UsersOnline usersOnline={usersOnline} />
      </div>
    );
  }
}

const mapStateToProps = (state: { users: types.UsersState, games: types.GamesState }) => {
  return {
    usersOnline: state.users.usersOnline,
    connected: state.users.isConnected,
    currentUser: state.users.currentUser,
    allGames: state.games.allGames,
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamesPage);
