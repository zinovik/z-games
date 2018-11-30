import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Button, Modal } from '@material-ui/core';

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
    this.props.newGame(types.NO_THANKS);
    this.setState({ isModalShow: false });
  };

  handleNewPerudoGame = () => {
    this.props.newGame(types.PERUDO);
    this.setState({ isModalShow: false });
  };

  render() {
    return (
      <div className='new-game-container'>
        <Button variant='contained' color='primary' onClick={this.handleNewGame}>New game</Button>

        <Modal
          open={this.state.isModalShow}
          onClose={this.handleClose}
        >
          <div className='new-game-modal-window'>
            <Button variant='contained' color='primary' onClick={this.handleNewNoThanksGame}>{types.NO_THANKS}</Button>
            <Button variant='contained' color='primary' onClick={this.handleNewPerudoGame}>{types.PERUDO}</Button>
          </div>
        </Modal>
      </div>
    );
  }

}
