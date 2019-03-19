import React, { Fragment, useState } from 'react';
import { func } from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { NO_THANKS } from 'z-games-no-thanks';
import { PERUDO } from 'z-games-perudo';
import { LOST_CITIES } from 'z-games-lost-cities';

import './index.scss';

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

  const handleCreateGame = (game: string) => {
    newGame(game);
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
            <Button onClick={() => handleCreateGame(NO_THANKS)}>{NO_THANKS}</Button>
            <Button onClick={() => handleCreateGame(PERUDO)}>{PERUDO}</Button>
            <Button onClick={() => handleCreateGame(LOST_CITIES)}>{LOST_CITIES}</Button>
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
