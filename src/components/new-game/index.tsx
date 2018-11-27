import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import * as types from '../../constants';

export const NewGame = ({ newGame }: { newGame: any }) => {
  const handleNewNoThanksGame = () => {
    newGame(types.NO_THANKS);
  };

  const handleNewPerudoGame = () => {
    newGame(types.PERUDO);
  };

  return (
    <div>
      New game
      <Button variant='contained' color='primary' onClick={handleNewNoThanksGame}>{types.NO_THANKS}</Button>
      <Button variant='contained' color='primary' onClick={handleNewPerudoGame}>{types.PERUDO}</Button>
    </div>
  );
}

NewGame.propTypes = {
  newGame: PropTypes.func.isRequired,
}
