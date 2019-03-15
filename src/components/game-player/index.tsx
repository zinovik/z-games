import React from 'react';
import { string, arrayOf, number, bool } from 'prop-types';
import { Typography, Avatar } from '@material-ui/core';
import { NO_THANKS } from 'z-games-no-thanks';
import { PERUDO } from 'z-games-perudo';
import { LOST_CITIES, LostCitiesCard } from 'z-games-lost-cities';

import {
  NoThanksPlayer,
  PerudoPlayer,
  LostCitiesPlayer,
} from '../../components';

import './index.css';

GamePlayer.propTypes = {
  gameName: string.isRequired,
  username: string.isRequired,
  avatar: string,
  cards: arrayOf(number),
  chips: number,
  points: number,
  dices: arrayOf(number),
  diceCount: number,
  active: bool,
}

GamePlayer.defaultProps = {
  gameName: 'game-name',
  username: 'username',
  active: false,
}

export function GamePlayer({
  gameName,
  username,
  avatar,
  cards,
  chips,
  points,
  dices,
  dicesCount,
  active,
  cardsHand,
  cardsHandCount,
  cardsExpeditions,
}: {
  gameName: string,
  username: string,
  avatar?: string,
  cards?: number[],
  chips?: number,
  points?: number,
  dices?: number[],
  dicesCount?: number,
  active?: boolean,
  cardsHand?: LostCitiesCard[],
  cardsHandCount?: number,
  cardsExpeditions?: LostCitiesCard[],
}) {
  return (
    <div className={`
      game-player-container
      game-player-container-${gameName === NO_THANKS ? 'no-thanks' : ''}${gameName === PERUDO ? 'perudo' : ''}${gameName === LOST_CITIES ? 'lost-cities' : ''}
      ${active ? 'game-player-container-active' : ''}
    `}>

      <div className='game-player-user'>
        <Avatar src={avatar}>
          {username[0]}
        </Avatar>

        <Typography className='game-player-username'>
          {username}
        </Typography>
      </div>

      {gameName === NO_THANKS && <NoThanksPlayer
        cards={cards || []}
        chips={chips}
        points={points}
      />}

      {gameName === PERUDO && <PerudoPlayer
        dices={dices}
        dicesCount={dicesCount}
      />}

      {gameName === LOST_CITIES && <LostCitiesPlayer
        cardsHand={cardsHand || []}
        cardsHandCount={cardsHandCount || 0}
        cardsExpeditions={cardsExpeditions || []}
        points={points || 0}
      />}

    </div>
  );
}
