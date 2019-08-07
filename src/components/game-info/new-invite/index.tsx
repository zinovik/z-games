import React, { Fragment, useState, ChangeEvent } from 'react';
import { string, array, func } from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Fab,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';

import { User } from '../../user';
import { IUser } from '../../../interfaces';

import './index.scss';

export function NewInvite({
  currentUserId,
  gameId,
  users,
  newInvite,
}: {
  currentUserId: string;
  gameId: string;
  users: IUser[];
  newInvite: (parameters: { gameId: string; userId: string }) => void;
}) {
  const [isModalShow, setIsModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedUsers, setLoadedUsers] = useState([] as IUser[]);
  const [timer, setTimer] = useState();

  const loadUsers = async (username: string) => {
    if (!username) {
      return;
    }

    setIsLoading(true);
    const token = localStorage.getItem('token');
    const fetchResult = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/find/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setIsLoading(false);

    if (fetchResult.status !== 200) {
      // TODO
      return;
    }

    setLoadedUsers(await fetchResult.json());
  };

  const handleNewGame = () => {
    setIsModalShow(true);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value;

    setLoadedUsers([]);

    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      loadUsers(newUsername);
    }, 1000);

    setTimer(newTimer);
  };

  const handleClose = () => {
    setIsModalShow(false);
  };

  const handleCreateInvite = (userId: string) => {
    newInvite({ gameId, userId });
    setIsModalShow(false);
  };

  return (
    <Fragment>
      <div className="new-invite-button">
        <Fab onClick={handleNewGame}>
          <PersonAdd />
        </Fab>
      </div>

      <Dialog open={isModalShow} onClose={handleClose}>
        <DialogTitle>New invite</DialogTitle>

        <DialogContent>
          <DialogContentText>Choose a player to invite</DialogContentText>

          <DialogActions>
            <div className="new-invite-users-container">
              {users.length > 1 && (
                <div>
                  <Typography>Users online:</Typography>
                  <div className="new-invite-users-online">
                    {users.map(
                      user =>
                        currentUserId !== user.id && (
                          <Button onClick={() => handleCreateInvite(user.id)} key={`new-invite-${user.id}`}>
                            <User username={user.username} avatar={user.avatar} />
                          </Button>
                        ),
                    )}
                  </div>
                </div>
              )}

              <div>
                <TextField type="text" placeholder="Username" onChange={handleUsernameChange} />
              </div>
              <div className="new-invite-users-online">
                {isLoading && <Typography>Loading...</Typography>}
                {loadedUsers.map(
                  user =>
                    currentUserId !== user.id && (
                      <Button onClick={() => handleCreateInvite(user.id)} key={`new-invite-${user.id}`}>
                        <User username={user.username} avatar={user.avatar} />
                      </Button>
                    ),
                )}
              </div>
            </div>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

NewInvite.propTypes = {
  currentUserId: string.isRequired,
  gameId: string.isRequired,
  users: array.isRequired,
  newInvite: func.isRequired,
};

NewInvite.defaultProps = {
  currentUserId: '',
  gameId: '',
  users: [],
  newInvite: () => null,
};
