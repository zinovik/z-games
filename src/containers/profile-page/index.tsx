import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { History } from 'history';

import { CurrentUserContext } from '../../App';
import { Header } from '../../components';

import './index.scss';

function ProfilePagePure({ history }: { history: History }) {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser) {
    history.push('home');
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

export const ProfilePage = withRouter(ProfilePagePure);
