import React, { Fragment } from 'react';
import { arrayOf, number } from 'prop-types';
import { Typography } from '@material-ui/core';

import { NoThanksCardsList, NoThanksChips } from '../';

NoThanksPlayer.propTypes = {
  cards: arrayOf(number).isRequired,
  chips: number,
  points: number,
}

NoThanksPlayer.defaultProps = {
  cards: [],
}

export function NoThanksPlayer({ cards, chips, points }: {
  cards: number[],
  chips?: number,
  points?: number,
  active?: boolean,
}) {
  return (
    <Fragment>
      <NoThanksCardsList cards={cards || []} />

      {chips !== undefined && <NoThanksChips chips={chips} />}

      {points !== undefined && <Typography>
        {points} points
      </Typography>}
    </Fragment>
  );
}
