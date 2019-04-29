import React, { Fragment, useState } from 'react';
import { string, array, func } from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { IUser } from '../../../interfaces';

import './index.scss';

export function NewInvite({ gameId, users, newInvite }: {
  gameId: string;
  users: IUser[];
  newInvite: (data: { gameId: string; userId: string; }) => void;
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
          <Add />
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
                <div
                  onClick={() => handleCreateInvite(user.id)}
                  title={`click to invite ${user.username}`}
                  key={`new-invite-${user.id}`}
                >
                  {user.username}
                </div>
              ))}
            </div>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

NewInvite.propTypes = {
  gameId: string.isRequired,
  users: array.isRequired,
  newInvite: func.isRequired,
};

NewInvite.defaultProps = {
  gameId: '',
  users: [],
  newInvite: () => null,
};
