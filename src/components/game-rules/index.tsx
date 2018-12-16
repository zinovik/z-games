import React, { Component, Props, Fragment } from 'react';
import { string, func } from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

// import * as types from '../../constants';

interface GameRulesProps extends Props<{}> {
  gameName: string,
  close: () => void,
}

export class GameRules extends Component<GameRulesProps, {}> {
  static propTypes = {
    gameName: string.isRequired,
    close: func.isRequired,
  };

  static defaultProps = {
    gameName: 'game-name',
    close: () => console.log,
  }

  handleClose = () => {
    const { close } = this.props;
    close();
  };

  render() {
    return (
      <Fragment>
        <Dialog open={true} onClose={this.handleClose}>
          <DialogTitle>Game rules</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Hello there
            </DialogContentText>
            <DialogActions>
              <Button onClick={this.handleClose}>Ok</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }

}
