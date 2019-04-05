import React from 'react';
import { object, string, number, bool } from 'prop-types';
import { Typography, Avatar } from '@material-ui/core';
import { IPerudoPlayer } from 'z-games-perudo';

import { PerudoPlayer } from '../perudo-player';
import './index.scss';

export function PerudoLastRoundResult({ gamePlayer, username, avatar, lastRoundFigure, isLastRoundMaputo }: {
  gamePlayer: IPerudoPlayer,
  username: string,
  avatar?: string,
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
        gamePlayer={gamePlayer}
        highlightNumber={lastRoundFigure}
        isHighlightJoker={!isLastRoundMaputo}
      />
    </div>
  );
}

PerudoLastRoundResult.propTypes = {
  gamePlayer: object.isRequired,
  username: string.isRequired,
  avatar: string,
  lastRoundFigure: number,
  isLastRoundMaputo: bool,
};

PerudoLastRoundResult.defaultProps = {
  gamePlayer: {},
  username: 'username',
};
