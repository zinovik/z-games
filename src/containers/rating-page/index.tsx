import React, { Component, Props } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/header';
import { Loading, UsersRating } from '../../components';
import { ZGamesApi } from '../../services';
import * as types from '../../constants';
import './index.scss';

interface IRatingPageProps extends Props<{}> {
  currentUser: types.IUser,
  isConnected: boolean,
  allGames: types.IGame[],
  usersOnline: types.IUser[],
  serverUrl: string,
}

interface IRatingPageState extends Props<{}> {
  users: types.IUser[],
}

class RatingPage extends Component<IRatingPageProps, IRatingPageState> {
  public state = {
    users: [],
  };

  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  constructor(props: IRatingPageProps) {
    super(props);

    this.zGamesApi.getUsers()
      .then(users => this.setState({ users }));
  }

  render() {
    const { isConnected, currentUser, usersOnline, serverUrl } = this.props;
    const { users } = this.state;

    return (
      <main className='rating-page-container'>
        <Header
          currentUsername={currentUser && currentUser.username}
          avatar={currentUser && currentUser.avatar}
          serverUrl={serverUrl}
          signUp={this.zGamesApi.register}
          signIn={this.zGamesApi.login}
          logOut={this.zGamesApi.logout}
          usersOnline={usersOnline}
        />

        <div className='rating-page-content'>
          <div className='rating-page-logo-container'>

            <UsersRating users={users} />

          </div>
        </div>

        <Loading isConnected={isConnected} />
      </main>
    );
  }
}

const mapStateToProps = (state: { users: types.IUsersState, games: types.IGamesState, server: types.IServerState }) => {
  return {
    usersOnline: state.users.usersOnline,
    isConnected: state.users.isConnected,
    currentUser: state.users.currentUser,
    allGames: state.games.allGames,
    serverUrl: state.server.serverUrl,
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatingPage);
