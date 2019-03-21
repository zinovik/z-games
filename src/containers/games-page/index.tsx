import React, { Component, Props } from 'react';
import { connect } from 'react-redux';

import { NewGame, GamesList, Loading } from '../../components';
import Header from '../../components/header';
import { newGame } from '../../services';
import * as types from '../../constants';
import './index.scss';

interface IGamesPageProps extends Props<{}> {
  currentUser: types.IUser,
  isConnected: boolean,
  allGames: types.IGame[],
  usersOnline: types.IUsersOnline,
}

class GamesPage extends Component<IGamesPageProps, {}> {

  render() {
    const { isConnected, currentUser, allGames, usersOnline } = this.props;

    return (
      <main className='games-page-container'>
        <Header
          currentUsername={currentUser && currentUser.username}
          avatar={currentUser && currentUser.avatar}
          usersOnline={usersOnline}
        />

        {currentUser && <NewGame newGame={newGame} />}

        <GamesList
          allGames={allGames}
          currentUsername={currentUser && currentUser.username}
        />

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
)(GamesPage);
