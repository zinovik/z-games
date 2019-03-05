import React from 'react';
import { string, func } from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, Typography, DialogActions } from '@material-ui/core';
import { BaseGame } from 'z-games-base-game';
import { NoThanks } from 'z-games-no-thanks';
import { Perudo } from 'z-games-perudo';

import * as types from '../../constants';

const gamesServices: { [key: string]: BaseGame } = {
  [types.NO_THANKS]: NoThanks.Instance,
  [types.PERUDO]: Perudo.Instance,
};

export function GameRules({ gameName, close }: {
  gameName: string,
  close: () => void,
}) {
  const handleClose = () => {
    close();
  };

  const rules = gamesServices[gameName].getRules();

  return (
    <Dialog open={true} onClose={handleClose}>

      <DialogTitle>Game rules - {gameName}</DialogTitle>

      <DialogContent>
        {rules.map((rule, index) => <Typography gutterBottom={true} key={index}>{rule}</Typography>)}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Ok</Button>
      </DialogActions>

    </Dialog>
  );
};

GameRules.propTypes = {
  gameName: string.isRequired,
  close: func.isRequired,
};

GameRules.defaultProps = {
  gameName: 'game-name',
  close: () => console.log,
};
