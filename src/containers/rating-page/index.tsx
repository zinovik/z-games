import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { Header, UsersRating } from '../../components';
import { fetchRating as fetchRatingWithoutDispatch } from '../../actions';
import { IUser, IUsersState, IGamesState } from '../../interfaces';

import './index.scss';

function RatingPagePure({ usersRating, fetchRating }: {
  usersRating: IUser[],
  fetchRating: () => Promise<void>,
}) {
  if (!usersRating.length) {
    fetchRating();
  }

  return (
    <main className='rating-page-container'>
      <Header />

      <div className='rating-page-content'>
        <UsersRating users={usersRating} />
      </div>
    </main>
  );
}

const mapStateToProps = (state: { users: IUsersState, games: IGamesState }) => ({
  usersRating: state.users.usersRating,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRating: bindActionCreators(fetchRatingWithoutDispatch, dispatch),
});

export const RatingPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatingPagePure as ComponentType<any>);
