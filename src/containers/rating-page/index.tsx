import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Header, Loading, UsersRating } from '../../components';
import { getUsers } from '../../services';
import * as types from '../../constants';

import './index.scss';

function RatingPageWithoutState({ currentUser, isConnected, usersOnline }: {
  currentUser: types.IUser,
  isConnected: boolean,
  usersOnline: types.IUsersOnline,
}) {
  const [users, setUsers] = useState([] as types.IUser[]);

  if (!users.length) {
    getUsers().then(usersFetched => setUsers(usersFetched));
  }

  return (
    <main className='rating-page-container'>
      <Header
        currentUsername={currentUser && currentUser.username}
        avatar={currentUser && currentUser.avatar}
        usersOnline={usersOnline}
      />

      <div className='rating-page-content'>
        <div className='rating-page-logo-container'>

          <UsersRating users={users} />

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
    allGames: state.games.allGames,
  };
};

const mapDispatchToProps = {
};

export const RatingPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatingPageWithoutState);
