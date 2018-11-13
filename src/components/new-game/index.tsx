import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import * as types from '../../constants';

export const NewGame = ({ newGame }: { newGame: any }) => {
  return (
    <div>
      New game
      <Button variant='contained' color='primary' onClick={() => { newGame(types.NO_THANKS); }}>{types.NO_THANKS}</Button>
      <Button variant='contained' color='primary' onClick={() => { newGame(types.PERUDO); }}>{types.PERUDO}</Button>
    </div>
  );
}

NewGame.propTypes = {
  newGame: PropTypes.func.isRequired,
}
