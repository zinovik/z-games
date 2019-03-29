import React, { useState, ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { Header, UsersRating } from '../../components';
import { fetchRating as fetchRatingWithoutDispatch } from '../../actions';
import { IUser, IState } from '../../interfaces';

import './index.scss';

function RatingPagePure({ usersRating, fetchRating }: {
  usersRating: IUser[],
  fetchRating: () => Promise<void>,
}) {
  const [isFetching, setIsFetched] = useState(false);

  if (!isFetching) {
    fetchRating();
    setIsFetched(true);
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

const mapStateToProps = (state: IState) => ({
  usersRating: state.users.usersRating,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRating: bindActionCreators(fetchRatingWithoutDispatch, dispatch),
});

export const RatingPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatingPagePure as ComponentType<any>);
