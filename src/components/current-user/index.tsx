import * as React from 'react';
import * as PropTypes from 'prop-types';

export const CurrentUser = ({ currentUsername, onLogOutClick }) => (
  <div>
    You are logged in as {currentUsername} - <button onClick={() => { onLogOutClick(); }}>Log out</button>
  </div>
);

CurrentUser.propTypes = {
  currentUsername: PropTypes.string,
  onLogOutClick: PropTypes.func.isRequired,
}
