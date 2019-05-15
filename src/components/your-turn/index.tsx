import React from 'react';
import { Typography } from '@material-ui/core';

import './index.scss';

export function YourTurn() {
  return (
    <div className='your-turn-container'>
      <Typography className='your-turn'>
        YOUR TURN!
      </Typography>
    </div>
  );
};

YourTurn.propTypes = {
};

YourTurn.defaultProps = {
};
