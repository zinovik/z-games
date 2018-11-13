import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

export const CurrentUser = ({ currentUsername, onLogOutClick }) => (
  <div>
    You are logged in as {currentUsername} - <Button variant='contained' color='primary' onClick={() => { onLogOutClick(); }}>Log out</Button>
  </div>
);

CurrentUser.propTypes = {
  currentUsername: PropTypes.string,
  onLogOutClick: PropTypes.func.isRequired,
}
