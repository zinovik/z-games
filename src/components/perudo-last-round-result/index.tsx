import React from 'react';
import { string, arrayOf, number } from 'prop-types';
import { Typography, Avatar } from '@material-ui/core';

import { PerudoPlayer } from '../../components';
import './index.css';

PerudoLastRoundResult.propTypes = {
  username: string.isRequired,
  dices: arrayOf(number),
}

PerudoLastRoundResult.defaultProps = {
  username: 'username',
}

export function PerudoLastRoundResult({ username, dices }: {
  username: string,
  dices?: number[],
}) {
  return (
    <div className='perudo-last-round-result-container'>
      <Avatar>
        {username[0]}
      </Avatar>

      <Typography>
        {username}
      </Typography>

      <PerudoPlayer
        dices={dices}
      />
    </div>
  );
}
