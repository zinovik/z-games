import React, { Fragment } from 'react';
import { object, bool } from 'prop-types';
import { Typography } from '@material-ui/core';
import { INoThanksPlayer } from 'z-games-no-thanks';

import { NoThanksCardsList } from '../no-thanks-cards-list';
import { NoThanksChips } from '../no-thanks-chips';

export function NoThanksPlayer({ gamePlayer }: {
  gamePlayer: INoThanksPlayer,
  isHideHand?: boolean,
  active?: boolean,
}) {
  const { cards, chips, points } = gamePlayer;

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

NoThanksPlayer.propTypes = {
  gamePlayer: object.isRequired,
  isHideHand: bool,
};

NoThanksPlayer.defaultProps = {
  gamePlayer: {},
};
