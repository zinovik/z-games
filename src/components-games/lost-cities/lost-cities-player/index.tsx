import React, { Fragment } from 'react';
import { arrayOf, shape, number } from 'prop-types';
import { Typography } from '@material-ui/core';
import { LostCitiesCard } from 'z-games-lost-cities';

LostCitiesPlayer.propTypes = {
  cardsHand: arrayOf(shape({
    cost: number,
    expedition: number,
  })).isRequired,
  cardsHandCount: number,
  cardsExpeditions: arrayOf(shape({
    cost: number,
    expedition: number,
  })).isRequired,
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

      {points !== undefined && <Typography>
        {points} points
      </Typography>}
    </Fragment>
  );
}
