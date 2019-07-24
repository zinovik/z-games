import React from 'react';
import { object, array } from 'prop-types';
import { Typography } from '@material-ui/core';
import { INoThanksPlayer } from 'z-games-no-thanks';

import { GamePlayer } from '../game-player';
import { IUser, IGame, IPlayerResult, GamePlayerType } from '../../interfaces';

import './index.scss';

export function GameResults({ game, players, gamePlayers }: { game: IGame; players: IUser[]; gamePlayers: GamePlayerType[] }) {
  const results: IPlayerResult[] = gamePlayers.map(gamePlayer => {
    const currentUser = players.find(player => player.id === gamePlayer.id);
    return {
      username: currentUser!.username,
      avatar: currentUser!.avatar,
      gamePlayer,
    };
  });

  results.sort((a, b) =>
    a.gamePlayer.place !== b.gamePlayer.place
      ? a.gamePlayer.place - b.gamePlayer.place
      : (a.gamePlayer as INoThanksPlayer).points - (b.gamePlayer as INoThanksPlayer).points,
  );

  return (
    <div className="game-results-container">
      {results.map((result, index) => (
        <div key={`result${index}`} className="game-results-player">
          <Typography>{result.gamePlayer.place} place</Typography>

          <GamePlayer game={game} username={result.username} avatar={result.avatar} gamePlayer={result.gamePlayer} isCurrentPlayer={true} />
        </div>
      ))}
    </div>
  );
}

GameResults.propTypes = {
  game: object.isRequired,
  players: array.isRequired,
  gamePlayers: array.isRequired,
};

GameResults.defaultProps = {
  game: {},
  players: [],
  gamePlayers: [],
};
