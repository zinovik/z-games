import React, { Fragment } from 'react';
import { object, bool } from 'prop-types';
import { Typography } from '@material-ui/core';
import { ILostCitiesPlayer } from 'z-games-lost-cities';

import { LostCitiesCardsList } from '../lost-cities-cards-list';
import { LostCitiesExpeditions } from '../lost-cities-expeditions';

export function LostCitiesPlayer({ gamePlayer, isHideHand }: {
  gamePlayer: ILostCitiesPlayer,
  isHideHand?: boolean,
}) {
  const { cardsHand, cardsExpeditions, points } = gamePlayer;

  return (
    <Fragment>
      {!isHideHand && cardsHand && cardsHand.length > 0 && <Fragment>
        <LostCitiesCardsList cards={cardsHand} />
      </Fragment>}

      <LostCitiesExpeditions cards={cardsExpeditions} />

      {points !== undefined && <Typography>
        {points} points
      </Typography>}
    </Fragment>
  );
}

LostCitiesPlayer.propTypes = {
  gamePlayer: object.isRequired,
  isHideHand: bool,
};

LostCitiesPlayer.defaultProps = {
  gamePlayer: {},
};
