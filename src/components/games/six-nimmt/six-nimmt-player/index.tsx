import React, { Fragment } from 'react';
import { object, bool } from 'prop-types';
import { Typography } from '@material-ui/core';
import { ISixNimmtPlayer } from 'z-games-six-nimmt';

import { SixNimmtCardsList } from '../six-nimmt-cards-list';

export function SixNimmtPlayer({ gamePlayer, isHideHand }: {
  gamePlayer: ISixNimmtPlayer,
  isHideHand?: boolean,
}) {
  const { cardsHand, points } = gamePlayer;

  return (
    <Fragment>
      {!isHideHand && cardsHand && cardsHand.length > 0 && <Fragment>
        <SixNimmtCardsList cards={cardsHand} />
      </Fragment>}

      {points !== undefined && <Typography>
        {points} points
      </Typography>}
    </Fragment>
  );
}

SixNimmtPlayer.propTypes = {
  gamePlayer: object.isRequired,
  isHideHand: bool,
};

SixNimmtPlayer.defaultProps = {
  gamePlayer: {},
};
