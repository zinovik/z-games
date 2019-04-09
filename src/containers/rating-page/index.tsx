import React, { useState, ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { Header } from '../header';
import { UsersRating } from '../../components/users-rating';
import { fetchRating as fetchRatingWithoutDispatch } from '../../actions';
import { IUser, IState } from '../../interfaces';

import './index.scss';

function RatingPagePure({ serverUrl, usersRating, fetchRating }: {
  serverUrl: string,
  usersRating: IUser[],
  fetchRating: (serverUrl: string) => Promise<void>,
}) {
  const [isFetching, setIsFetched] = useState(false);

  if (!isFetching) {
    fetchRating(serverUrl);
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
  serverUrl: state.users.serverUrl,
  usersRating: state.users.usersRating,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRating: bindActionCreators(fetchRatingWithoutDispatch, dispatch),
});

export const RatingPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatingPagePure as ComponentType<any>);
