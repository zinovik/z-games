import React from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import { Header } from '../../components';
import { IUser, IUsersState, IGamesState } from '../../interfaces';

import './index.scss';

function ProfilePagePure({ currentUser }: {
  currentUser: IUser,
}) {
  if (!currentUser) {
    // TODO: Redirect
    return null;
  }

  const { username, email, firstName, lastName } = currentUser;

  return (
    <main className='profile-page-container'>
      <Header />

      <div className='profile-page-content'>
        <div className='profile-page-data'>
          <Typography variant='h5'>
            {username}
          </Typography>

          <Typography>
            {email}
          </Typography>

          <Typography>
            {`${firstName} ${lastName}`}
          </Typography>
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = (state: { users: IUsersState, games: IGamesState }) => ({
  currentUser: state.users.currentUser,
});

const mapDispatchToProps = () => ({
});

export const ProfilePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilePagePure);
