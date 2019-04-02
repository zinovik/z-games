import React, { Fragment, useState, ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { object, string } from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { GAME_NOT_STARTED } from 'z-games-base-game';

import { GameRules } from '../../components';
import {
  closeGame as closeGameWithoutDispatch,
  leaveGame as leaveGameWithoutDispatch,
  readyToGame as readyToGameWithoutDispatch,
  startGame as startGameWithoutDispatch,
} from '../../actions';
import { IGame, GamePlayerType, GameDataType, GAMES_LOGOS, IState } from '../../interfaces';

import './index.scss';

function GameInfoPure({ game, currentUserId, isButtonsDisabled, closeGame, leaveGame, readyToGame, startGame }: {
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
        <img src={GAMES_LOGOS[game.name]} className='game-info-img' onClick={handleLogoClick} />
      </Typography>

      <div className='game-info-players'>
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

GameInfoPure.propTypes = {
  game: object.isRequired,
  currentUserId: string.isRequired,
};

GameInfoPure.defaultProps = {
  game: {},
  currentUserId: 'user-id',
};

const mapStateToProps = (state: IState) => ({
  isButtonsDisabled: state.users.isButtonsDisabled,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeGame: bindActionCreators(closeGameWithoutDispatch, dispatch),
  leaveGame: bindActionCreators(leaveGameWithoutDispatch, dispatch),
  readyToGame: bindActionCreators(readyToGameWithoutDispatch, dispatch),
  startGame: bindActionCreators(startGameWithoutDispatch, dispatch),
});

export const GameInfo = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameInfoPure as ComponentType<any>);
