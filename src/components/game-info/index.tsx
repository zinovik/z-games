import React, { Fragment, useState } from 'react';
import { object, string, bool, func } from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { GAME_NOT_STARTED } from 'z-games-base-game';

import { GameRules } from '../../components/game-rules';
import { GamesServices } from '../../services';
import { IGame, GamePlayerType, GameDataType } from '../../interfaces';

import './index.scss';

export function GameInfo({ game, currentUserId, isButtonsDisabled, closeGame, leaveGame, readyToGame, startGame }: {
  game: IGame,
  currentUserId: string,
  isButtonsDisabled: boolean,
  closeGame: (gameNumber: number) => void,
  leaveGame: (gameNumber: number) => void,
  readyToGame: (gameNumber: number) => void,
  startGame: (gameNumber: number) => void,
}) {
  const [isRulesShown, setIsRulesShown] = useState(false);

  const handleLogoClick = () => {
    setIsRulesShown(true);
  };

  const handleRulesClose = () => {
    setIsRulesShown(false);
  };

  const handleCloseClick = () => {
    closeGame(game.number);
  };

  const handleLeaveClick = () => {
    leaveGame(game.number);
  };

  const handleReadyClick = () => {
    readyToGame(game.number);
  };

  const handleStartClick = () => {
    startGame(game.number);
  };

  const { playersOnline, watchers } = game;
  const gameDataParsed: GameDataType = JSON.parse(game.gameData);
  const { players: gamePlayers }: { players: GamePlayerType[] } = gameDataParsed;

  const isAbleToStart = game.players.length >= game.playersMin
    && game.players.length <= game.playersMax
    && gamePlayers.every(gamePlayer => gamePlayer.ready);

  return (
    <div className='game-info-container'>
      <Typography>
        <img
          src={`/images/${GamesServices[game.name].getNameWork()}.png`}
          className='game-info-img'
          onClick={handleLogoClick}
          title={`click to see ${game.name} game rules`}
        />
      </Typography>

      <div className='game-info-players'>
      
        <Typography>
          #{game.number}: {game.name}
        </Typography>

        <Typography>
          Players
        </Typography>

        {game.state === GAME_NOT_STARTED && <Typography>
          ({game.playersMin} min, {game.playersMax} max)
        </Typography>}

        {gamePlayers.map((gamePlayer, index) => (
          <Typography key={index}>

            {playersOnline.some(playerOnline => playerOnline.id === gamePlayer.id) ?
              (gamePlayer.ready ?
                <span className='player-dot game-green-dot' /> :
                <span className='player-dot game-yellow-dot' />) :
              <span className='player-dot game-red-dot' />
            }

            {game.players.find(player => player.id === gamePlayer.id) && game.players.find(player => player.id === gamePlayer.id)!.username}
          </Typography>
        ))}

        {!!watchers.length && <Typography>
          Watchers
        </Typography>}

        {watchers.map((watcher, index) => (
          <Typography key={index}>
            <span className='player-dot game-green-dot' />
            {watcher.username}
          </Typography>
        ))}
      </div>

      <div className='game-info-buttons'>
        <Button onClick={handleCloseClick} disabled={isButtonsDisabled}>Close</Button>

        {game.state === GAME_NOT_STARTED && <Button onClick={handleLeaveClick} disabled={isButtonsDisabled}>Leave</Button>}

        {game.state === GAME_NOT_STARTED && <Fragment>
          <Button onClick={handleReadyClick} disabled={isButtonsDisabled}>
            {gamePlayers.find(gamePlayer => gamePlayer.id === currentUserId)!.ready ? 'Not Ready' : 'Ready'}
          </Button>

          <Button onClick={handleStartClick} disabled={!isAbleToStart || isButtonsDisabled}>Start</Button>
        </Fragment>}
      </div>

      {isRulesShown && <GameRules gameName={game.name} close={handleRulesClose} />}

    </div>
  );
};

GameInfo.propTypes = {
  game: object.isRequired,
  currentUserId: string.isRequired,
  isButtonsDisabled: bool.isRequired,
  closeGame: func.isRequired,
  leaveGame: func.isRequired,
  readyToGame: func.isRequired,
  startGame: func.isRequired,
};

GameInfo.defaultProps = {
  game: {},
  currentUserId: '',
  isButtonsDisabled: false,
  closeGame: () => null,
  leaveGame: () => null,
  readyToGame: () => null,
  startGame: () => null,
};
