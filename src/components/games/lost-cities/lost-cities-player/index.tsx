import React, { Fragment } from 'react';
import { arrayOf, shape, number } from 'prop-types';
import { Typography } from '@material-ui/core';
import { ILostCitiesCard, getCardShape } from 'z-games-lost-cities';

import { LostCitiesCardsList } from '../lost-cities-cards-list';
import { LostCitiesExpeditions } from '../lost-cities-expeditions';

export function LostCitiesPlayer({ cardsHand, cardsHandCount, cardsExpeditions, points }: {
  cardsHand: ILostCitiesCard[],
  cardsHandCount: number,
  cardsExpeditions: ILostCitiesCard[],
  points: number,
}) {
  return (
    <Fragment>
      <Typography>
        Hand cards
      </Typography>
      <LostCitiesCardsList cards={cardsHand} />

      {cardsHandCount !== undefined && !cardsHand.length && <Typography>
        {cardsHandCount} cards
      </Typography>}

      <Typography>
        Expeditions
      </Typography>
      <LostCitiesExpeditions cards={cardsExpeditions} />

      {points !== undefined && <Typography>
        {points} points
      </Typography>}
    </Fragment>
  );
}

LostCitiesPlayer.propTypes = {
  cardsHand: arrayOf(shape(getCardShape(number))).isRequired,
  cardsHandCount: number.isRequired,
  cardsExpeditions: arrayOf(shape(getCardShape(number))).isRequired,
  points: number.isRequired,
};

LostCitiesPlayer.defaultProps = {
  cardsHand: [],
  cardsHandCount: 0,
  cardsExpeditions: [],
  points: 0,
};
