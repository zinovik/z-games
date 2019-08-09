import React, { Fragment } from 'react';
import { func } from 'prop-types';
import { Fab } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import './index.scss';

export function LeaveGame({ leave }: { leave: () => void }) {
  const handleLeave = () => {
    leave();
  };

  return (
    <Fragment>
      <div className="leave-game-button">
        <Fab onClick={handleLeave} title="click to leave the game">
          <Close />
        </Fab>
      </div>
    </Fragment>
  );
}

LeaveGame.propTypes = {
  leave: func.isRequired,
};

LeaveGame.defaultProps = {
  leave: () => null,
};
