import React, { Fragment, useState, ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { func } from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { NAME as NO_THANKS } from 'z-games-no-thanks';
import { NAME as PERUDO } from 'z-games-perudo';
import { NAME as LOST_CITIES } from 'z-games-lost-cities';

import { newGame as newGameWithoutDispatch } from '../../actions';

import './index.scss';

function NewGamePure({ newGame }: {
  newGame: (gameName: string) => void,
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

NewGamePure.propTypes = {
  newGame: func.isRequired,
};

NewGamePure.defaultProps = {
  newGame: () => null,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  newGame: bindActionCreators(newGameWithoutDispatch, dispatch),
});

export const NewGame = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewGamePure as ComponentType<any>);
