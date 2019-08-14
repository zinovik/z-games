import React, { Fragment } from 'react';
import { object, number, bool } from 'prop-types';
import { Typography } from '@material-ui/core';
import { IPerudoPlayer } from 'z-games-perudo';
import { GAME_FINISHED } from 'z-games-base-game';

import { PerudoDices } from '../perudo-dices';
import { IGame } from '../../../../interfaces';

export function PerudoPlayer({
  gamePlayer,
  highlightNumber,
  isHighlightJoker,
  game,
}: {
  gamePlayer: IPerudoPlayer;
  isCurrentPlayer?: boolean;
  isMyTurn?: boolean;
  game?: IGame;
  highlightNumber?: number;
  isHighlightJoker?: boolean;
}) {
  const { dices, dicesCount } = gamePlayer;

  let lastRoundDiceFigure = 0;

  if (game && game.state === GAME_FINISHED) {
    lastRoundDiceFigure = JSON.parse(game.gameData).lastRoundDiceFigure;
  }

  return (
    <Fragment>
      {dices && dices.length > 0 && (
        <PerudoDices
          dices={dices}
          highlightNumber={highlightNumber || lastRoundDiceFigure}
          isHighlightJoker={isHighlightJoker}
        />
      )}

      {(!dices || !dices.length) && <Typography>{dicesCount} dices</Typography>}
    </Fragment>
  );
}

PerudoPlayer.propTypes = {
  gamePlayer: object.isRequired,
  isCurrentPlayer: bool,
  isMyTurn: bool,
  game: object,
  highlightNumber: number,
  isHighlightJoker: bool,
};

PerudoPlayer.defaultProps = {
  gamePlayer: {},
};
