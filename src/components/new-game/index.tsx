import React, { Fragment, useState } from 'react';
import { func } from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Fab,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

import { GamesServices } from '../../services';

import './index.scss';

export function NewGame({ newGame }: { newGame: (parameters: { name: string; isPrivate: boolean }) => void }) {
  const [isModalShow, setIsModalShow] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleNewGame = () => {
    setIsModalShow(true);
  };

  const handleClose = () => {
    setIsModalShow(false);
  };

  const handlePrivate = () => {
    setIsPrivate(!isPrivate);
  };

  const handleCreateGame = (name: string) => {
    newGame({ name, isPrivate });
    setIsModalShow(false);
  };

  return (
    <Fragment>
      <div className="new-game-button">
        <Fab onClick={handleNewGame}>
          <Add />
        </Fab>
      </div>

      <Dialog open={isModalShow} onClose={handleClose}>
        <DialogTitle>New game</DialogTitle>
        <DialogContent>
          <DialogContentText>Choose a game to create</DialogContentText>
          <DialogActions>
            <div className="new-game-actions">
              <Typography>
                <FormControlLabel
                  control={<Checkbox checked={isPrivate} onChange={handlePrivate} />}
                  label="Private Game"
                />
              </Typography>

              <div className="new-game-games">
                {Object.keys(GamesServices).map(gameName => (
                  <img
                    src={`/images/${GamesServices[gameName].getNameWork()}.png`}
                    className="game-img"
                    onClick={() => handleCreateGame(gameName)}
                    title={`click to create new ${gameName} game`}
                    key={`new-game-${gameName}`}
                    alt="game logo"
                  />
                ))}
              </div>
            </div>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

NewGame.propTypes = {
  newGame: func.isRequired,
};

NewGame.defaultProps = {
  newGame: () => null,
};
