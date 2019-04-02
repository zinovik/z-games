import React, { Fragment } from 'react';
import { array, number, bool } from 'prop-types';
import { IPerudoPlayer } from 'z-games-perudo';

import { PerudoLastRoundResult } from '../';
import { IUser } from '../../../interfaces';

export function PerudoLastRoundResults({ gamePlayers, players, lastRoundFigure, isLastRoundMaputo }: {
  gamePlayers: IPerudoPlayer[],
  players: IUser[],
  lastRoundFigure: number,
  isLastRoundMaputo: boolean,
}) {
  return (
    <div>
      {gamePlayers.map((gamePlayer, index) => (
        <Fragment key={index}>

          {players.find(player => player.id === gamePlayer.id) && <PerudoLastRoundResult
            username={players.find(player => player.id === gamePlayer.id)!.username}
            avatar={players.find(player => player.id === gamePlayer.id)!.avatar}
            dices={gamePlayer.dices}
            lastRoundFigure={lastRoundFigure}
            isLastRoundMaputo={isLastRoundMaputo}
          />}

        </Fragment>
      ))}
    </div>
  );
}

PerudoLastRoundResults.propTypes = {
  gamePlayer: array.isRequired,
  players: array.isRequired,
  lastRoundFigure: number.isRequired,
  isLastRoundMaputo: bool.isRequired,
};

PerudoLastRoundResults.defaultProps = {
  gamePlayer: [],
  players: [],
  lastRoundFigure: 0,
  isLastRoundMaputo: false,
};
