import React from 'react';
import { string, arrayOf, number, bool } from 'prop-types';
import { Typography, Avatar } from '@material-ui/core';

import { PerudoPlayer } from '../../components';
import './index.css';

PerudoLastRoundResult.propTypes = {
  username: string.isRequired,
  dices: arrayOf(number),
  lastRoundFigure: number,
  isLastRoundMaputo: bool,
}

PerudoLastRoundResult.defaultProps = {
  username: 'username',
}

export function PerudoLastRoundResult({ username, dices, lastRoundFigure, isLastRoundMaputo }: {
  username: string,
  dices?: number[],
  lastRoundFigure: number,
  isLastRoundMaputo: boolean,
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
        highlightNumber={lastRoundFigure}
        highlightJoker={!isLastRoundMaputo}
      />
    </div>
  );
}
