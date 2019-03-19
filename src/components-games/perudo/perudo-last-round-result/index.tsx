import React from 'react';
import { string, arrayOf, number, bool } from 'prop-types';
import { Typography, Avatar } from '@material-ui/core';

import { PerudoPlayer } from '../';
import './index.scss';

PerudoLastRoundResult.propTypes = {
  username: string.isRequired,
  avatar: string.isRequired,
  dices: arrayOf(number),
  lastRoundFigure: number,
  isLastRoundMaputo: bool,
}

PerudoLastRoundResult.defaultProps = {
  username: 'username',
}

export function PerudoLastRoundResult({ username, avatar, dices, lastRoundFigure, isLastRoundMaputo }: {
  username: string,
  avatar: string,
  dices?: number[],
  lastRoundFigure: number,
  isLastRoundMaputo: boolean,
}) {
  return (
    <div className='perudo-last-round-result-container'>
      <Avatar src={avatar}>
        {username[0]}
      </Avatar>

      <Typography className='perudo-last-round-result-player-username'>
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
