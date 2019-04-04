import React from 'react';
import { string, array } from 'prop-types';
import { Typography } from '@material-ui/core';
import { INoThanksPlayer } from 'z-games-no-thanks';
import { NAME as PERUDO, IPerudoPlayer } from 'z-games-perudo';
import { NAME as LOST_CITIES, ILostCitiesPlayer } from 'z-games-lost-cities';

import { GamePlayer } from '../../components/game-player';
import { IUser, IPlayerResult, GamePlayerType } from '../../interfaces';

import './index.scss';

export function GameResults({ gameName, players, gamePlayers }: {
  gameName: string,
  players: IUser[],
  gamePlayers: GamePlayerType[],
}) {
  const results: IPlayerResult[] = gamePlayers.map(gamePlayer => {
    const currentUser = players.find(player => player.id === gamePlayer.id);

    if (gameName === LOST_CITIES) {
      return {
        username: currentUser!.username,
        avatar: currentUser!.avatar,
        place: gamePlayer.place,
        cardsExpeditions: (gamePlayer as ILostCitiesPlayer).cardsExpeditions || [],
        cardsHand: (gamePlayer as ILostCitiesPlayer).cardsHand || [],
        points: (gamePlayer as ILostCitiesPlayer).points || 0,
      };
    }

    if (gameName === PERUDO) {
      return {
        username: currentUser!.username,
        avatar: currentUser!.avatar,
        place: gamePlayer.place,
        dicesCount: (gamePlayer as IPerudoPlayer).dicesCount || 0,
        points: 0,
      };
    }

    return {
      username: currentUser!.username,
      avatar: currentUser!.avatar,
      place: gamePlayer.place,
      cards: (gamePlayer as INoThanksPlayer).cards || [],
      chips: (gamePlayer as INoThanksPlayer).chips || 0,
      points: (gamePlayer as INoThanksPlayer).points || 0,
    };
  });

  results.sort((a, b) => (a.place === b.place ? a.points - b.points : a.place - b.place));

  return (
    <div className='game-results-container'>
      {results.map((result, index) => (
        <div key={`result${index}`} className='game-results-player'>

          <Typography>
            {result.place} place
          </Typography>

          <GamePlayer
            gameName={gameName}
            username={result.username}
            avatar={result.avatar}
            gamePlayer={result as unknown as GamePlayerType}
          />

        </div>
      ))}
    </div>
  );
}

GameResults.propTypes = {
  gameName: string.isRequired,
  players: array.isRequired,
  gamePlayers: array.isRequired,
}

GameResults.defaultProps = {
  gameName: '',
  players: [],
  gamePlayers: [],
}
