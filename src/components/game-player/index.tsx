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

import { IGame, GamePlayerType } from 'src/interfaces';

import './index.scss';

export function GamePlayer({
  game,
  username,
  avatar,
  active,
  gamePlayer,
  isCurrentPlayer,
  isMyTurn,
}: {
  game: IGame;
  username: string;
  avatar?: string;
  active?: boolean;
  gamePlayer?: GamePlayerType;
  isCurrentPlayer?: boolean;
  isMyTurn?: boolean;
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

      {game.name === NO_THANKS && <NoThanksPlayer
        gamePlayer={gamePlayer as INoThanksPlayer}
        isCurrentPlayer={isCurrentPlayer}
        isMyTurn={isMyTurn}
        game={game}
      />}

      {game.name === PERUDO && <PerudoPlayer
        gamePlayer={gamePlayer as IPerudoPlayer}
        isCurrentPlayer={isCurrentPlayer}
        isMyTurn={isMyTurn}
        game={game}
      />}

      {game.name === LOST_CITIES && <LostCitiesPlayer
        gamePlayer={gamePlayer as ILostCitiesPlayer}
        isCurrentPlayer={isCurrentPlayer}
        isMyTurn={isMyTurn}
        game={game}
      />}

      {game.name === SIX_NIMMT && <SixNimmtPlayer
        gamePlayer={gamePlayer as ISixNimmtPlayer}
        isCurrentPlayer={isCurrentPlayer}
        isMyTurn={isMyTurn}
        game={game}
      />}

    </div>
  );
}

GamePlayer.propTypes = {
  game: object.isRequired,
  username: string.isRequired,
  avatar: string,
  active: bool,
  gamePlayer: object,
  isCurrentPlayer: bool,
  isMyTurn: bool,
};

GamePlayer.defaultProps = {
  game: {},
  username: '',
};
