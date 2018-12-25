import React, { Component, Props } from 'react';
import { string, func } from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, Typography, DialogActions } from '@material-ui/core';
import { BaseGame } from 'z-games-base-game';
import { NoThanks } from 'z-games-no-thanks';
import { Perudo } from 'z-games-perudo';

import * as types from '../../constants';

interface GameRulesProps extends Props<{}> {
  gameName: string,
  close: () => void,
}

const gamesServices: { [key: string]: BaseGame } = {
  [types.NO_THANKS]: NoThanks.Instance,
  [types.PERUDO]: Perudo.Instance,
};

export class GameRules extends Component<GameRulesProps, {}> {

  static propTypes = {
    gameName: string.isRequired,
    close: func.isRequired,
  };

  static defaultProps = {
    gameName: 'game-name',
    close: () => console.log,
  };

  handleClose = () => {
    const { close } = this.props;

    close();
  };

  render() {
    const { gameName } = this.props;
    const rules = gamesServices[gameName].getRules();

    return (
      <Dialog open={true} onClose={this.handleClose} fullScreen={true}>

        <DialogTitle>Game rules - {gameName}</DialogTitle>

        <DialogContent>
          {rules.map((rule, index) => <Typography gutterBottom={true} key={index}>{rule}</Typography>)}
        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleClose}>Ok</Button>
        </DialogActions>

      </Dialog>
    );
  }

}
