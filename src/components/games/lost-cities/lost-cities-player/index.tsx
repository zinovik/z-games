import React, { Fragment } from 'react';
import { object, bool } from 'prop-types';
import { Typography } from '@material-ui/core';
import { ILostCitiesPlayer } from 'z-games-lost-cities';

import { LostCitiesCardsList } from '../lost-cities-cards-list';
import { LostCitiesExpeditions } from '../lost-cities-expeditions';
import { IGame } from '../../../../interfaces';

export function LostCitiesPlayer({ gamePlayer, isCurrentPlayer, isMyTurn, game }: {
  gamePlayer: ILostCitiesPlayer,
  isCurrentPlayer?: boolean,
  isMyTurn?: boolean,
  game?: IGame,
}) {
  const { cardsHand, cardsExpeditions, points } = gamePlayer;

  return (
    <Fragment>
      {(isCurrentPlayer && !isMyTurn) && cardsHand && cardsHand.length > 0 && <Fragment>
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
  isCurrentPlayer: bool,
  isMyTurn: bool,
  game: object,
};

LostCitiesPlayer.defaultProps = {
  gamePlayer: {},
};
