import React from 'react';
import { string, func } from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, Typography, DialogActions } from '@material-ui/core';
import { BaseGame } from 'z-games-base-game';
import { NoThanks, NO_THANKS } from 'z-games-no-thanks';
import { Perudo, PERUDO } from 'z-games-perudo';
import { LostCities, LOST_CITIES } from 'z-games-lost-cities';

const gamesServices: { [key: string]: BaseGame } = {
  [NO_THANKS]: NoThanks.Instance,
  [PERUDO]: Perudo.Instance,
  [LOST_CITIES]: LostCities.Instance,
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
