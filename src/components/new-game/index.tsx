import React, { Component, Props, Fragment } from 'react';
import { func } from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import * as types from '../../constants';
import './index.css';

interface NewGameProps extends Props<{}> {
  newGame: (name: string) => void,
}

export class NewGame extends Component<NewGameProps, {}> {
  static propTypes = {
    newGame: func.isRequired,
  };

  static defaultProps = {
    newGame: () => console.log,
  }

  public state = {
    isModalShow: false,
  };

  handleNewGame = () => {
    this.setState({ isModalShow: true });
  };

  handleClose = () => {
    this.setState({ isModalShow: false });
  };

  handleNewNoThanksGame = () => {
    const { newGame } = this.props;
    newGame(types.NO_THANKS);
    this.setState({ isModalShow: false });
  };

  handleNewPerudoGame = () => {
    const { newGame } = this.props;
    newGame(types.PERUDO);
    this.setState({ isModalShow: false });
  };

  render() {
    return (
      <Fragment>
        <div className='new-game-button'>
          <Fab onClick={this.handleNewGame}>
            <Add />
          </Fab>
        </div>

        <Dialog open={this.state.isModalShow} onClose={this.handleClose}>
          <DialogTitle>New game</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Choose a game to create
            </DialogContentText>
            <DialogActions>
              <Button onClick={this.handleNewNoThanksGame}>{types.NO_THANKS}</Button>
              <Button onClick={this.handleNewPerudoGame}>{types.PERUDO}</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }

}
