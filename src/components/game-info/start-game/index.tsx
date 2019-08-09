import React, { Fragment } from 'react';
import { func } from 'prop-types';
import { Fab } from '@material-ui/core';
import { PlayArrow } from '@material-ui/icons';

import './index.scss';

export function StartGame({ start }: { start: () => void }) {
  const handleStart = () => {
    start();
  };

  return (
    <Fragment>
      <div className="start-game-button">
        <Fab onClick={handleStart} title="click to start the game">
          <PlayArrow />
        </Fab>
      </div>
    </Fragment>
  );
}

StartGame.propTypes = {
  start: func.isRequired,
};

StartGame.defaultProps = {
  start: () => null,
};
