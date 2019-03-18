import React, { Fragment } from 'react';
import { arrayOf, shape, number } from 'prop-types';
import { Typography } from '@material-ui/core';
import { LostCitiesCard } from 'z-games-lost-cities';

import { LostCitiesCardsList } from '../';

const lostCitiesCardShape = {
  cost: number,
  expedition: number,
};

LostCitiesPlayer.propTypes = {
  cardsHand: arrayOf(shape(lostCitiesCardShape)).isRequired,
  cardsHandCount: number,
  cardsExpeditions: arrayOf(shape(lostCitiesCardShape)).isRequired,
  points: number,
}

LostCitiesPlayer.defaultProps = {
  cards: [],
}

export function LostCitiesPlayer({ cardsHand, cardsHandCount, cardsExpeditions, points }: {
  cardsHand: LostCitiesCard[],
  cardsHandCount: number,
  cardsExpeditions: LostCitiesCard[],
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
