import React, { Fragment, useState } from 'react';
import { string, array, func } from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Fab, Button } from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';
import { IUser } from '../../../interfaces';

import './index.scss';

export function NewInvite({ currentUserId, gameId, users, newInvite }: {
  currentUserId: string;
  gameId: string;
  users: IUser[];
  newInvite: (parameters: { gameId: string; userId: string; }) => void;
}) {
  const [isModalShow, setIsModalShow] = useState(false);

  const handleNewGame = () => {
    setIsModalShow(true);
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
      <div className='new-invite-button'>
        <Fab onClick={handleNewGame}>
          <PersonAdd />
        </Fab>
      </div>

      <Dialog open={isModalShow} onClose={handleClose}>
        <DialogTitle>New invite</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose a player to invite
          </DialogContentText>
          <DialogActions>
            <div className='new-invite-players'>
              {users.map(user => (
                currentUserId !== user.id && <Button
                  onClick={() => handleCreateInvite(user.id)}
                  key={`new-invite-${user.id}`}
                >
                  {user.username}
                </Button>
              ))}
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
