import React from 'react';
import { string, bool, object } from 'prop-types';
import { Typography, Avatar } from '@material-ui/core';
import { NO_THANKS, NoThanksPlayer as INoThanksPlayer } from 'z-games-no-thanks';
import { PERUDO, PerudoPlayer as IPerudoPlayer } from 'z-games-perudo';
import { LOST_CITIES, LostCitiesPlayer as ILostCitiesPlayer } from 'z-games-lost-cities';

import {
  NoThanksPlayer,
  PerudoPlayer,
  LostCitiesPlayer,
} from '../../components';
import { GamePlayerType } from 'src/interfaces';

import './index.scss';

export function GamePlayer({
  gameName,
  username,
  avatar,
  active,
  gamePlayer,
}: {
  gameName: string,
  username: string,
  avatar?: string,
  active?: boolean,
  gamePlayer?: GamePlayerType;
}) {
  let gameNameInStyle = '';

  switch (gameName) {
    case NO_THANKS:
      gameNameInStyle = 'no-thanks';
      break;
    case PERUDO:
      gameNameInStyle = 'perudo';
      break;
    case LOST_CITIES:
      gameNameInStyle = 'lost-cities';
      break;
  }

  return (
    <div className={`
      game-player-container
      game-player-container-${gameNameInStyle}
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
        cards={(gamePlayer as INoThanksPlayer).cards}
        chips={(gamePlayer as INoThanksPlayer).chips}
        points={(gamePlayer as INoThanksPlayer).points}
      />}

      {gameName === PERUDO && <PerudoPlayer
        dices={(gamePlayer as IPerudoPlayer).dices}
        dicesCount={(gamePlayer as IPerudoPlayer).dicesCount}
      />}

      {gameName === LOST_CITIES && <LostCitiesPlayer
        cardsHand={(gamePlayer as ILostCitiesPlayer).cardsHand || []}
        cardsHandCount={(gamePlayer as ILostCitiesPlayer).cardsHandCount || 0}
        cardsExpeditions={(gamePlayer as ILostCitiesPlayer).cardsExpeditions || []}
        points={(gamePlayer as ILostCitiesPlayer).points || 0}
      />}

    </div>
  );
};

GamePlayer.propTypes = {
  gameName: string.isRequired,
  username: string.isRequired,
  avatar: string,
  active: bool,
  gamePlayer: object,
};

GamePlayer.defaultProps = {
  gameName: 'game-name',
  username: 'username',
  active: false,
};
