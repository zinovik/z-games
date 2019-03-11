import React, { Component, Props } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/header';
import { Loading, UsersRating } from '../../components';
import { ZGamesApi } from '../../services';
import * as types from '../../constants';
import './index.css';

interface RatingPageProps extends Props<{}> {
  currentUser: types.User,
  isConnected: boolean,
  allGames: types.Game[],
  usersOnline: types.User[],
}

interface RatingPageState extends Props<{}> {
  users: types.User[],
}

class RatingPage extends Component<RatingPageProps, RatingPageState> {
  public state = {
    users: [],
  };

  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  constructor(props: RatingPageProps) {
    super(props);

    this.zGamesApi.getUsers()
      .then(users => this.setState({ users }));
  }

  render() {
    const { isConnected, currentUser, usersOnline } = this.props;
    const { users } = this.state;

    return (
      <main className='rating-page-container'>
        <Header
          currentUsername={currentUser && currentUser.username}
          avatar={currentUser && currentUser.avatar}
          serverUrl={this.zGamesApi.SERVER_URL}
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
)(RatingPage);
