import React, { Fragment } from 'react';
import { func } from 'prop-types';
import { Fab } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import './index.scss';

export function RemoveGame({ remove }: { remove: () => void }) {
  const handleRemove = () => {
    remove();
  };

  return (
    <Fragment>
      <div className="remove-game-button">
        <Fab onClick={handleRemove} title="click to remove the game">
          <Delete />
        </Fab>
      </div>
    </Fragment>
  );
}

RemoveGame.propTypes = {
  remove: func.isRequired,
};

RemoveGame.defaultProps = {
  remove: () => null,
};
