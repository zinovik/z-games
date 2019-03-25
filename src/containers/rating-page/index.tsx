import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { Header, Loading, UsersRating } from '../../components';
import { fetchRating } from '../../actions';
import * as types from '../../constants';

import './index.scss';

function RatingPagePure({ usersRating, isConnected, fetchUsersRating }: {
  usersRating: types.IUser[],
  currentUser: types.IUser,
  isConnected: boolean,
  usersOnline: types.IUsersOnline,
  fetchUsersRating: () => Promise<void>,
}) {
  if (!usersRating.length) {
    fetchUsersRating();
  }

  return (
    <main className='rating-page-container'>
      <Header />

      <div className='rating-page-content'>
        <div className='rating-page-logo-container'>

          <UsersRating users={usersRating} />

        </div>
      </div>

      <Loading isConnected={isConnected} text='Connecting to the server...' />
    </main>
  );
}

const mapStateToProps = (state: { users: types.IUsersState, games: types.IGamesState }) => ({
  usersRating: state.users.usersRating,
  isConnected: state.users.isConnected,
  allGames: state.games.allGames,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUsersRating: bindActionCreators(fetchRating, dispatch),
});

export const RatingPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatingPagePure as ComponentType<any>);
