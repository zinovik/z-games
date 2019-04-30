import React, { Fragment } from 'react';
import { object, bool } from 'prop-types';
import { Typography } from '@material-ui/core';
import { INoThanksPlayer } from 'z-games-no-thanks';

import { NoThanksCardsList } from '../no-thanks-cards-list';
import { NoThanksChips } from '../no-thanks-chips';
import { IGame } from '../../../../interfaces';

export function NoThanksPlayer({ gamePlayer, isCurrentPlayer }: {
  gamePlayer: INoThanksPlayer;
  isCurrentPlayer?: boolean;
  isMyTurn?: boolean;
  game?: IGame;
  active?: boolean;
}) {
  const { cards, chips, points } = gamePlayer;

  return (
    <Fragment>
      <NoThanksCardsList cards={cards || []} />

      {isCurrentPlayer && chips !== undefined && <NoThanksChips chips={chips} />}

      {isCurrentPlayer && points !== undefined && <Typography>
        {points} points
      </Typography>}
    </Fragment>
  );
}

NoThanksPlayer.propTypes = {
  gamePlayer: object.isRequired,
  isCurrentPlayer: bool,
  isMyTurn: bool,
  game: object,
};

NoThanksPlayer.defaultProps = {
  gamePlayer: {},
};
