import React, { Fragment } from 'react';
import { func } from 'prop-types';
import { Fab } from '@material-ui/core';
import { Replay } from '@material-ui/icons';

import './index.scss';

export function RepeatGame({ repeat }: { repeat: () => void }) {
  const handleRepeat = () => {
    repeat();
  };

  return (
    <Fragment>
      <div className="repeat-game-button">
        <Fab onClick={handleRepeat} title="click to repeat the game">
          <Replay />
        </Fab>
      </div>
    </Fragment>
  );
}

RepeatGame.propTypes = {
  repeat: func.isRequired,
};

RepeatGame.defaultProps = {
  repeat: () => null,
};
