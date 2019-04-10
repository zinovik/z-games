import React from 'react';
import { string, bool, object } from 'prop-types';
import { Typography, Avatar } from '@material-ui/core';
import { NAME as NO_THANKS, INoThanksPlayer } from 'z-games-no-thanks';
import { NAME as PERUDO, IPerudoPlayer } from 'z-games-perudo';
import { NAME as LOST_CITIES, ILostCitiesPlayer } from 'z-games-lost-cities';
import { NAME as SIX_NIMMT, ISixNimmtPlayer } from 'z-games-six-nimmt';

import { NoThanksPlayer } from '../../components/games/no-thanks/no-thanks-player';
import { PerudoPlayer } from '../../components/games/perudo/perudo-player';
import { LostCitiesPlayer } from '../../components/games/lost-cities/lost-cities-player';
import { SixNimmtPlayer } from '../../components/games/six-nimmt/six-nimmt-player';

import { GamePlayerType } from 'src/interfaces';

import './index.scss';

export function GamePlayer({
  gameName,
  username,
  avatar,
  active,
  gamePlayer,
  isPlayersTurn,
}: {
  gameName: string,
  username: string,
  avatar?: string,
  active?: boolean,
  gamePlayer?: GamePlayerType;
  isPlayersTurn?: boolean,
}) {
  return (
    <div className={`game-player-container${active ? ' game-player-container-active' : ''}`}>

      <div className='game-player-user'>
        <Avatar src={avatar}>
          {username[0]}
        </Avatar>

        <Typography className='game-player-username'>
          {username}
        </Typography>
      </div>

      {gameName === NO_THANKS && <NoThanksPlayer
        gamePlayer={gamePlayer as INoThanksPlayer}
        isHideHand={isPlayersTurn}
      />}

      {gameName === PERUDO && <PerudoPlayer
        gamePlayer={gamePlayer as IPerudoPlayer}
        isHideHand={isPlayersTurn}
      />}

      {gameName === LOST_CITIES && <LostCitiesPlayer
        gamePlayer={gamePlayer as ILostCitiesPlayer}
        isHideHand={isPlayersTurn}
      />}

      {gameName === SIX_NIMMT && <SixNimmtPlayer
        gamePlayer={gamePlayer as ISixNimmtPlayer}
        isHideHand={isPlayersTurn}
      />}

    </div>
  );
}

GamePlayer.propTypes = {
  gameName: string.isRequired,
  username: string.isRequired,
  avatar: string,
  active: bool,
  gamePlayer: object,
  isPlayersTurn: bool,
};

GamePlayer.defaultProps = {
  gameName: '',
  username: '',
};
