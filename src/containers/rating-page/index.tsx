import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { Header, UsersRating } from '../../components';
import { fetchRating } from '../../actions';
import { IUser, IUsersOnline, IUsersState, IGamesState } from '../../interfaces';

import './index.scss';

function RatingPagePure({ usersRating, fetchUsersRating }: {
  usersRating: IUser[],
  currentUser: IUser,
  usersOnline: IUsersOnline,
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
    </main>
  );
}

const mapStateToProps = (state: { users: IUsersState, games: IGamesState }) => ({
  usersRating: state.users.usersRating,
  allGames: state.games.allGames,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUsersRating: bindActionCreators(fetchRating, dispatch),
});

export const RatingPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatingPagePure as ComponentType<any>);
