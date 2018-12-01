import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Button, Modal, Fab, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import * as types from '../../constants';
import './index.css';

interface NewGameProps extends React.Props<{}> {
  newGame: (name: string) => void,
}

export class NewGame extends React.Component<NewGameProps, {}> {
  static propTypes = {
    newGame: PropTypes.func.isRequired,
  };

  state = {
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
      <div className='new-game-container'>
        <Fab onClick={this.handleNewGame}>
          <Add />
        </Fab>

        <Modal open={this.state.isModalShow} onClose={this.handleClose}>
          <Typography className='new-game-modal-window'>
            <Button variant='contained' onClick={this.handleNewNoThanksGame}>{types.NO_THANKS}</Button>
            <Button variant='contained' onClick={this.handleNewPerudoGame}>{types.PERUDO}</Button>
          </Typography>
        </Modal>
      </div>
    );
  }

}
