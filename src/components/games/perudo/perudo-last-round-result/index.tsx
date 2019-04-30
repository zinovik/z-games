import React from 'react';
import { object, string, number, bool } from 'prop-types';
import { Typography, Avatar } from '@material-ui/core';
import { IPerudoPlayer } from 'z-games-perudo';

import { PerudoPlayer } from '../perudo-player';
import './index.scss';

export function PerudoLastRoundResult({ gamePlayer, username, avatar, lastRoundFigure, isLastRoundMaputo }: {
  gamePlayer: IPerudoPlayer;
  username: string;
  avatar?: string;
  lastRoundFigure: number;
  isLastRoundMaputo: boolean;
}) {
  return (
    <div className='perudo-last-round-result-container'>
      <div className='perudo-last-round-result-player'>
        <div className='perudo-last-round-result-player-avatar'>
          <Avatar src={avatar}>
            {username[0]}
          </Avatar>
        </div>

        <Typography>
          {username}
        </Typography>
      </div>

      <div className='perudo-last-round-result-player-result'>
        <PerudoPlayer
          gamePlayer={gamePlayer}
          highlightNumber={lastRoundFigure}
          isHighlightJoker={!isLastRoundMaputo}
        />
      </div>
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
