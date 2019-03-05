import React, { Fragment, useState } from 'react';
import { func } from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import * as types from '../../constants';
import './index.css';

export function NewGame({ newGame }: {
  newGame: (name: string) => void,
}) {
  const [isModalShow, setIsModalShow] = useState(false);

  const handleNewGame = () => {
    setIsModalShow(true);
  };

  const handleClose = () => {
    setIsModalShow(false);
  };

  const handleNewNoThanksGame = () => {
    newGame(types.NO_THANKS);
    setIsModalShow(false);
  };

  const handleNewPerudoGame = () => {
    newGame(types.PERUDO);
    setIsModalShow(false);
  };

  return (
    <Fragment>
      <div className='new-game-button'>
        <Fab onClick={handleNewGame}>
          <Add />
        </Fab>
      </div>

      <Dialog open={isModalShow} onClose={handleClose}>
        <DialogTitle>New game</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose a game to create
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleNewNoThanksGame}>{types.NO_THANKS}</Button>
            <Button onClick={handleNewPerudoGame}>{types.PERUDO}</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

NewGame.propTypes = {
  newGame: func.isRequired,
};

NewGame.defaultProps = {
  newGame: () => console.log,
};
