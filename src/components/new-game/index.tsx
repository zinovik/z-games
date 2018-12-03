import React, { Component, Props } from 'react';
import { func } from 'prop-types';
import { Button, Modal, Fab } from '@material-ui/core';
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
      <div>
        <Fab onClick={this.handleNewGame} className='new-game-button'>
          <Add />
        </Fab>

        <Modal open={this.state.isModalShow} onClose={this.handleClose}>
          <div className='new-game-modal-window'>
            <Button variant='contained' onClick={this.handleNewNoThanksGame}>{types.NO_THANKS}</Button>
            <Button variant='contained' onClick={this.handleNewPerudoGame}>{types.PERUDO}</Button>
          </div>
        </Modal>
      </div>
    );
  }

}
