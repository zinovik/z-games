import React from 'react';
import { string, func } from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, Typography, DialogActions } from '@material-ui/core';

import { GamesServices } from '../../services';

export function GameRules({ gameName, close }: {
  gameName: string,
  close: () => void,
}) {
  const handleClose = () => {
    close();
  };

  const rules = GamesServices[gameName].getRules();

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
  gameName: '',
  close: () => null,
};
