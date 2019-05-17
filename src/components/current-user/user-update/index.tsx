import React, { useState, ChangeEvent } from 'react';
import { string, func } from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
} from '@material-ui/core';

import { IUser } from '../../../interfaces';

import './index.scss';

export function UserUpdate({ currentUsername, updateCurrentUser, close }: {
  currentUsername: string,
  updateCurrentUser: (parameters: IUser) => void,
  close: () => void;
}) {
  const [username, setUsername] = useState(currentUsername);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    const fetchResult = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/update`, {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (fetchResult.status !== 200) { // TODO
      return;
    }

    updateCurrentUser({ username } as IUser);
    close();
  };

  return (
    <Dialog open={true} onClose={close}>
      <DialogTitle>Update profile</DialogTitle>
      <DialogContent>

        <DialogContentText>
          Username
        </DialogContentText>

        <TextField
          type='text'
          placeholder='Username'
          onChange={handleUsernameChange}
          value={username}
        />

        <DialogActions>
          <Button onClick={close} autoFocus={true}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={!username}>
            Update
          </Button>

          <input
            accept='image/*'
            id='button-file-avatar'
            multiple={true}
            type='file'
            className='file-input'
          />
          <label htmlFor='button-file-avatar'>
            <Button component='span'>
              Update avatar
            </Button>
          </label>
        </DialogActions>

      </DialogContent>
    </Dialog>
  );
}

UserUpdate.propTypes = {
  currentUsername: string.isRequired,
  updateCurrentUser: func.isRequired,
  close: func.isRequired,
};

UserUpdate.defaultProps = {
  currentUsername: '',
  updateCurrentUser: () => null,
  close: () => null,
};
