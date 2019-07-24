import React from 'react';
import { object, string, number, bool } from 'prop-types';
import { IPerudoPlayer } from 'z-games-perudo';

import { PerudoPlayer } from '../perudo-player';
import { User } from '../../../user';
import './index.scss';

export function PerudoLastRoundResult({
  gamePlayer,
  username,
  avatar,
  lastRoundDiceFigure,
  isLastRoundMaputo,
}: {
  gamePlayer: IPerudoPlayer;
  username: string;
  avatar?: string;
  lastRoundDiceFigure: number;
  isLastRoundMaputo: boolean;
}) {
  return (
    <div className="perudo-last-round-result-container">
      <User username={username} avatar={avatar} />

      <div className="perudo-last-round-result-player-result">
        <PerudoPlayer gamePlayer={gamePlayer} highlightNumber={lastRoundDiceFigure} isHighlightJoker={!isLastRoundMaputo} />
      </div>
    </div>
  );
}

PerudoLastRoundResult.propTypes = {
  gamePlayer: object.isRequired,
  username: string.isRequired,
  avatar: string,
  lastRoundDiceFigure: number,
  isLastRoundMaputo: bool,
};

PerudoLastRoundResult.defaultProps = {
  gamePlayer: {},
  username: 'username',
};
