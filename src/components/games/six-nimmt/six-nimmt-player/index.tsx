import React, { Fragment } from 'react';
import { object, bool } from 'prop-types';
import { Typography } from '@material-ui/core';
import { ISixNimmtPlayer, ISixNimmtData } from 'z-games-six-nimmt';

import { SixNimmtCardsList } from '../six-nimmt-cards-list';
import { SixNimmtCard } from '../six-nimmt-card';
import { IGame } from '../../../../interfaces';

import './index.scss';

export function SixNimmtPlayer({ gamePlayer, isCurrentPlayer, isMyTurn, game }: {
  gamePlayer: ISixNimmtPlayer;
  isCurrentPlayer?: boolean;
  isMyTurn?: boolean;
  game?: IGame;
}) {
  const { cardsHand, cardsTakenCount, points, pointsCurrentRound, lastPlayedCard, lastPlayedCardForPlayers, lastTakenCards } = gamePlayer;

  let isCardsPlaying = false;

  if (game) {
    const { gameData } = game;
    isCardsPlaying = (JSON.parse(gameData) as ISixNimmtData).isCardsPlaying;
  }

  return (
    <Fragment>
      {(isCurrentPlayer && (!isMyTurn || !isCardsPlaying)) && cardsHand && cardsHand.length > 0 && <Fragment>
        <SixNimmtCardsList cards={cardsHand} />
      </Fragment>}

      <div className='six-nimmt-player-last-info-container'>
        {lastPlayedCard && <div className='six-nimmt-player-last-info'>
          <Typography>
            Last played
          </Typography>
          <div>
            <SixNimmtCard card={lastPlayedCard} />
          </div>
        </div>}

        {lastPlayedCardForPlayers && !lastPlayedCard && <div className='six-nimmt-player-last-info'>
          <Typography>
            Last played
          </Typography>
          <div>
            <SixNimmtCard card={lastPlayedCardForPlayers} />
          </div>
        </div>}

        {lastTakenCards && lastTakenCards.length > 0 && <div className='six-nimmt-player-last-info'>
          <Typography>
            Last taken
          </Typography>
          <div>
            <SixNimmtCardsList cards={lastTakenCards} />
          </div>
        </div>}
      </div>

      {cardsTakenCount !== undefined && <Typography className='six-nimmt-player-cards-and-points'>
        {cardsTakenCount} cards taken | {points} (+{pointsCurrentRound}) points
      </Typography>}
    </Fragment>
  );
}

SixNimmtPlayer.propTypes = {
  gamePlayer: object.isRequired,
  isCurrentPlayer: bool,
  isMyTurn: bool,
  game: object,
};

SixNimmtPlayer.defaultProps = {
  gamePlayer: {},
};
