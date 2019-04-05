import React, { Fragment } from 'react';
import { object, number, bool } from 'prop-types';
import { Typography } from '@material-ui/core';
import { IPerudoPlayer } from 'z-games-perudo';

import { PerudoDices } from '../perudo-dices';

export function PerudoPlayer({ gamePlayer, highlightNumber, isHighlightJoker }: {
  gamePlayer: IPerudoPlayer,
  isHideHand?: boolean,
  highlightNumber?: number,
  isHighlightJoker?: boolean,
}) {
  const { dices, dicesCount } = gamePlayer;

  return (
    <Fragment>
      {dices && dices.length > 0 && <PerudoDices
        dices={dices}
        highlightNumber={highlightNumber}
        isHighlightJoker={isHighlightJoker}
      />}

      {!dices || !dices.length && <Typography>
        {dicesCount} dices
      </Typography>}
    </Fragment>
  );
}

PerudoPlayer.propTypes = {
  gamePlayer: object.isRequired,
  isHideHand: bool,
  highlightNumber: number,
  isHighlightJoker: bool,
};

PerudoPlayer.defaultProps = {
  gamePlayer: {},
};
