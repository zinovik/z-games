import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';

import { CurrentUserContext } from '../../App';
import { Header } from '../header';
import { UserProfile } from '../../components/user-profile';

import './index.scss';

function ProfilePagePure({
  match: {
    params: { username },
  },
  history,
}: {
  match: { params: { username: string } };
  history: History;
}) {
  let currentUser = useContext(CurrentUserContext);

  if (username) {
    currentUser = null; // TODO
    return null;
  }

  if (!currentUser) {
    history.push('home');
    return null;
  }

  return (
    <main className="profile-page-container">
      <Header />

      <div className="profile-page-content">
        <UserProfile user={currentUser} />
      </div>
    </main>
  );
}

export const ProfilePage = withRouter(ProfilePagePure);
