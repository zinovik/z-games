import React, { Fragment } from 'react';
import { arrayOf, shape, number } from 'prop-types';
import { Typography } from '@material-ui/core';
import { ILostCitiesCard, getCardShape } from 'z-games-lost-cities';

import { LostCitiesCardsList } from '../';

export function LostCitiesPlayer({ cardsHand, cardsHandCount, cardsExpeditions, points }: {
  cardsHand: ILostCitiesCard[],
  cardsHandCount: number,
  cardsExpeditions: ILostCitiesCard[],
  points: number,
}) {
  return (
    <Fragment>
      <LostCitiesCardsList cards={cardsHand} />

      {cardsHandCount !== undefined && <Typography>
        {cardsHandCount} cards
      </Typography>}

      <LostCitiesCardsList cards={cardsExpeditions} />

      {points !== undefined && <Typography>
        {points} points
      </Typography>}
    </Fragment>
  );
}

LostCitiesPlayer.propTypes = {
  cardsHand: arrayOf(shape(getCardShape(number))).isRequired,
  cardsHandCount: number,
  cardsExpeditions: arrayOf(shape(getCardShape(number))).isRequired,
  points: number,
};

LostCitiesPlayer.defaultProps = {
  cards: [],
};
