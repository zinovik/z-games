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

import { Loading } from '../../loading';
import { IUser } from '../../../interfaces';

import './index.scss';

export function UserUpdate({
  currentUsername,
  updateCurrentUser,
  close,
}: {
  currentUsername: string;
  updateCurrentUser: (parameters: IUser) => void;
  close: () => void;
}) {
  const [username, setUsername] = useState(currentUsername);
  const [isLoading, setIsLoading] = useState(false);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleUsernameUpdate = async () => {
    const token = localStorage.getItem('token');
    const fetchResult = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/update`, {
      method: 'POST',
      body: JSON.stringify({ username }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (fetchResult.status !== 200) {
      // TODO
      return;
    }

    updateCurrentUser({ username } as IUser);
    close();
  };

  const handleAvatarUpdate = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target || !target.files || !target.files[0]) {
      return;
    }

    setIsLoading(true);

    const formData = new FormData();

    formData.append('file', target.files[0]);

    const token = localStorage.getItem('token');
    const fetchResult = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/avatar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    setIsLoading(false);

    if (fetchResult.status !== 201 || !fetchResult || !fetchResult.body) {
      // TODO
      return;
    }

    const { avatar } = await fetchResult.json();
    updateCurrentUser({ avatar } as IUser);
    close();
  };

  return (
    <Dialog open={true} onClose={close}>
      <DialogTitle>Update profile</DialogTitle>
      <DialogContent>
        <DialogContentText>Username</DialogContentText>

        <TextField type="text" placeholder="Username" onChange={handleUsernameChange} value={username} />

        <DialogActions className="user-update-buttons">
          <div>
            <Button onClick={close} autoFocus={true}>
              Cancel
            </Button>
            <Button onClick={handleUsernameUpdate} disabled={!username}>
              Update
            </Button>
          </div>

          <div>
            <input
              accept="image/*"
              id="button-file-avatar"
              multiple={true}
              type="file"
              className="file-input"
              onChange={handleAvatarUpdate}
            />
          </div>

          <div className="user-update-avatar-button">
            <label htmlFor="button-file-avatar">
              <Button component="span">Update avatar</Button>
            </label>
          </div>
        </DialogActions>
      </DialogContent>

      {isLoading && <Loading />}
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
