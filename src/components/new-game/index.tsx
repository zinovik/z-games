import * as React from 'react';
import * as PropTypes from 'prop-types';

export const NewGame = ({ newGame }: { newGame: any }) => {
  return (
    <div>
      New game
      <button onClick={() => { newGame('No, Thanks!'); }}>No, Thanks!</button>
      <button onClick={() => { newGame('Perudo'); }}>Perudo</button>
    </div>
  );
}

NewGame.propTypes = {
  newGame: PropTypes.func.isRequired,
}
