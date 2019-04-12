import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { History } from 'history';

import { CurrentUserContext } from '../../App';
import { Header } from '../header';

import './index.scss';

function ProfilePagePure({ history }: { history: History }) {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser) {
    history.push('home');
    return null;
  }

  const { username, email, firstName, lastName, gamesPlayed, gamesWon } = currentUser;

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

          <Typography>
            Games Played: {gamesPlayed}
          </Typography>

          <Typography>
            Games Won: {gamesWon}
          </Typography>
        </div>
      </div>

    </main>
  );
}

export const ProfilePage = withRouter(ProfilePagePure);
