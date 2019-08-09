import React, { Fragment } from 'react';
import { func } from 'prop-types';
import { Fab } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import './index.scss';

export function CloseGame({ close }: { close: () => void }) {
  const handleClose = () => {
    close();
  };

  return (
    <Fragment>
      <div className="close-game-button">
        <Fab onClick={handleClose} title="click to close the game">
          <ArrowBack />
        </Fab>
      </div>
    </Fragment>
  );
}

CloseGame.propTypes = {
  close: func.isRequired,
};

CloseGame.defaultProps = {
  close: () => null,
};
