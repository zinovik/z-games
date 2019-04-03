import React from 'react';
import { string, bool, object } from 'prop-types';
import { Typography, Avatar } from '@material-ui/core';
import { NAME as NO_THANKS, INoThanksPlayer } from 'z-games-no-thanks';
import { NAME as PERUDO, IPerudoPlayer } from 'z-games-perudo';
import { NAME as LOST_CITIES, ILostCitiesPlayer } from 'z-games-lost-cities';

import { GamesServices } from '../../services';

import { NoThanksPlayer } from '../../components/games/no-thanks/no-thanks-player';
import { PerudoPlayer } from '../../components/games/perudo/perudo-player';
import { LostCitiesPlayer } from '../../components/games/lost-cities/lost-cities-player';
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
  const gameNameInStyle = GamesServices[gameName].getNameWork();

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
  gameName: '',
  username: '',
};
