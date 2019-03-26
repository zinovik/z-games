import React, { Fragment, useState, ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { object, string } from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { GAME_NOT_STARTED } from 'z-games-base-game';

import { GameRules } from '../../components';
import { closeGame, leaveGame, readyToGame, startGame, updateIsButtonsDisabled } from '../../actions';
import { IGame, GamePlayerType, GameData, GAMES_LOGOS, IUsersState, IGamesState } from '../../interfaces';

import './index.scss';

function GameInfoPure({ game, currentUserId, disableButtons, close, leave, ready, start, isButtonsDisabled }: {
  game: IGame,
  currentUserId: string,
  isButtonsDisabled: boolean,
  close: (gameNumber: number) => void,
  leave: (gameNumber: number) => void,
  ready: (gameNumber: number) => void,
  start: (gameNumber: number) => void,
  disableButtons: (isDisabled: boolean) => void,
}) {
  const [isRulesShown, setIsRulesShown] = useState(false);
  const [oldGameData, setOldGameData] = useState('');

  const { gameData } = game;

  if (gameData !== oldGameData) {
    disableButtons(false);
    setOldGameData(gameData);
  }

  const handleLogoClick = () => {
    setIsRulesShown(true);
  };

  const handleRulesClose = () => {
    setIsRulesShown(false);
  };

  const handleCloseClick = () => {
    close(game.number);
  };

  const handleLeaveClick = () => {
    leave(game.number);
  };

  const handleReadyClick = () => {
    ready(game.number);
  };

  const handleStartClick = () => {
    start(game.number);
  };

  const { playersOnline, watchers } = game;
  const gameDataParsed: GameData = JSON.parse(game.gameData);
  const playersInGame: GamePlayerType[] = gameDataParsed.players;

  const isAbleToStart = game.players.length >= game.playersMin
    && game.players.length <= game.playersMax
    && playersInGame.every((playerInGame: GamePlayerType) => playerInGame.ready);

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

GameInfoPure.propTypes = {
  game: object.isRequired,
  currentUserId: string.isRequired,
};

GameInfoPure.defaultProps = {
  game: {},
  currentUserId: 'user-id',
};

const mapStateToProps = (state: { users: IUsersState, games: IGamesState }) => ({
  isButtonsDisabled: state.users.isButtonsDisabled,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  disableButtons: bindActionCreators(updateIsButtonsDisabled, dispatch),
  close: bindActionCreators(closeGame, dispatch),
  leave: bindActionCreators(leaveGame, dispatch),
  ready: bindActionCreators(readyToGame, dispatch),
  start: bindActionCreators(startGame, dispatch),
});

export const GameInfo = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameInfoPure as ComponentType<any>);
