import React, { Fragment, useState } from 'react';
import { object, string, func } from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { GAME_NOT_STARTED } from 'z-games-base-game';

import { GameRules } from '../../components';
import * as types from '../../constants';
import './index.css';

export function GameInfo({ game, currentUserId, leave, close, ready, start }: {
  game: types.IGame,
  currentUserId: string,
  leave: () => void,
  close: () => void,
  ready: () => void,
  start: () => void,
}) {
  const [isRulesShown, setIsRulesShown] = useState(false);
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);
  const [oldGameData, setOldGameData] = useState('');

  const { gameData } = game;

  if (gameData !== oldGameData) {
    setIsButtonsDisabled(false);
    setOldGameData(gameData);
  }

  const handleLogoClick = () => {
    setIsRulesShown(true);
  };

  const handleRulesClose = () => {
    setIsRulesShown(false);
  };

  const handleCloseClick = () => {
    setIsRulesShown(false);
    setIsButtonsDisabled(true);

    close();
  };

  const handleLeaveClick = () => {
    setIsRulesShown(false);
    setIsButtonsDisabled(true);

    leave();
  };

  const handleReadyClick = () => {
    setIsRulesShown(false);
    setIsButtonsDisabled(true);

    ready();
  };

  const handleStartClick = () => {
    setIsRulesShown(false);
    setIsButtonsDisabled(true);

    start();
  };

  const { playersOnline, watchers } = game;
  const gameDataParsed: types.GameData = JSON.parse(game.gameData);
  const playersInGame: types.GamePlayer[] = gameDataParsed.players;

  const isAbleToStart = game.players.length >= game.playersMin
    && game.players.length <= game.playersMax
    && playersInGame.every((playerInGame: types.GamePlayer) => playerInGame.ready);

  return (
    <div className='game-info-container'>
      <Typography>
        <img src={types.GAMES_LOGOS[game.name]} className='game-info-img' onClick={handleLogoClick} />
      </Typography>

      <div className='game-info-players'>
        <Typography>
          Players
        </Typography>

        {game.state === GAME_NOT_STARTED && <Typography>
          ({game.playersMin} min, {game.playersMax} max)
        </Typography>}

        {playersInGame.map((playerInGame, index) => (
          <Typography key={index}>

            {playersOnline.some((playerOnline) => playerOnline.id === playerInGame.id) ?
              (playerInGame.ready ?
                <span className='player-dot game-green-dot' /> :
                <span className='player-dot game-yellow-dot' />) :
              <span className='player-dot game-red-dot' />
            }

            {game.players.find(player => player.id === playerInGame.id)!.username}
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
            {playersInGame.find(playerInGame => playerInGame.id === currentUserId)!.ready ? 'Not Ready' : 'Ready'}
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
  leave: func.isRequired,
  close: func.isRequired,
  ready: func.isRequired,
  start: func.isRequired,
};

GameInfo.defaultProps = {
  game: {},
  currentUserId: 'user-id',
  leave: () => console.log,
  close: () => console.log,
  ready: () => console.log,
  start: () => console.log,
};
