import React from 'react';
import { string, arrayOf, number, bool } from 'prop-types';
import { Typography, Avatar } from '@material-ui/core';

import { NoThanksPlayer, PerudoPlayer } from '../../components';
import * as types from '../../constants';
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

export function GamePlayer({ gameName, username, avatar, cards, chips, points, dices, dicesCount, active }: {
  gameName: string,
  username: string,
  avatar?: string,
  cards?: number[],
  chips?: number,
  points?: number,
  dices?: number[],
  dicesCount?: number,
  active?: boolean,
}) {
  return (
    <div className={`
      game-player-container
      game-player-container-${gameName === types.NO_THANKS ? 'no-thanks' : ''}${gameName === types.PERUDO ? 'perudo' : ''}
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

      {gameName === types.NO_THANKS && <NoThanksPlayer
        cards={cards || []}
        chips={chips}
        points={points}
      />}

      {gameName === types.PERUDO && <PerudoPlayer
        dices={dices}
        dicesCount={dicesCount}
      />}

    </div>
  );
}
