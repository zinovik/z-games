import React, { Fragment } from 'react';
import { object, bool } from 'prop-types';
import { Typography } from '@material-ui/core';
import { ISixNimmtPlayer } from 'z-games-six-nimmt';

import { SixNimmtCardsList } from '../six-nimmt-cards-list';
import { SixNimmtCard } from '../six-nimmt-card';

import './index.scss';

export function SixNimmtPlayer({ gamePlayer, isHideHand }: {
  gamePlayer: ISixNimmtPlayer,
  isHideHand?: boolean,
}) {
  const { cardsHand, cardsTakenCount, points, pointsCurrentRound, lastPlayedCard, lastPlayedCardForPlayers, lastTakenCards } = gamePlayer;

  return (
    <Fragment>
      {!isHideHand && cardsHand && cardsHand.length > 0 && <Fragment>
        <SixNimmtCardsList cards={cardsHand} />
      </Fragment>}

      <div className='six-nimmt-player-last-info-container'>
        {lastPlayedCard && <div className='six-nimmt-player-last-info'>
          <Typography>
            Last played card:
          </Typography>
          <div>
            <SixNimmtCard card={lastPlayedCard} />
          </div>
        </div>}

        {lastPlayedCardForPlayers && !lastPlayedCard && <div className='six-nimmt-player-last-info'>
          <Typography>
            Last played card:
          </Typography>
          <div>
            <SixNimmtCard card={lastPlayedCardForPlayers} />
          </div>
        </div>}

        {lastTakenCards && lastTakenCards.length > 0 && <div className='six-nimmt-player-last-info'>
          <Typography>
            Last taken cards:
          </Typography>
          <div>
            <SixNimmtCardsList cards={lastTakenCards} />
          </div>
        </div>}
      </div>

      {cardsTakenCount !== undefined && <Typography>
        {cardsTakenCount} cards taken
      </Typography>}

      <Typography>
        {points} (+{pointsCurrentRound}) points
      </Typography>
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
