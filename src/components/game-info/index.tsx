import React, { useState } from 'react';
import { object, string, bool, func, array } from 'prop-types';
import { Typography } from '@material-ui/core';
import { Lock } from '@material-ui/icons';
import { GAME_NOT_STARTED, GAME_STARTED, GAME_FINISHED, BaseGame } from 'z-games-base-game';

import { GameRules } from '../game-rules';
import { GameOptions } from './game-options';
import { NewInvite } from './new-invite';
import { GameMoveTime } from './game-move-time';
import { StartGame } from './start-game';
import { CloseGame } from './close-game';
import { LeaveGame } from './leave-game';
import { RepeatGame } from './repeat-game';
import { RemoveGame } from './remove-game';
import { GamesServices } from '../../services';
import { IGame, GamePlayerType, GameDataType, IUser } from '../../interfaces';

import './index.scss';

export function GameInfo({
  game,
  currentUserId,
  isButtonsDisabled,
  users,
  closeGame,
  leaveGame,
  startGame,
  updateRemovingGame,
  repeatGame,
  updateOption,
  newInvite,
}: {
  game: IGame;
  currentUserId: string;
  isButtonsDisabled: boolean;
  users: IUser[];
  closeGame: () => void;
  leaveGame: (gameId: string) => void;
  startGame: (gameId: string) => void;
  updateRemovingGame: (gameId: string) => void;
  repeatGame: (gameId: string) => void;
  updateOption: (parameters: { gameId: string; name: string; value: string }) => void;
  newInvite: (parameters: { gameId: string; userId: string }) => void;
}) {
  const [isRulesShown, setIsRulesShown] = useState(false);

  const handleLogoClick = () => {
    setIsRulesShown(true);
  };

  const handleRulesClose = () => {
    setIsRulesShown(false);
  };

  const handleCloseClick = () => {
    closeGame();
  };

  const handleLeaveClick = () => {
    leaveGame(game.id);
  };

  const handleStartClick = () => {
    startGame(game.id);
  };

  const handleRemoveClick = () => {
    updateRemovingGame(game.id);
  };

  const handleRepeatClick = () => {
    repeatGame(game.id);
  };

  const { playersOnline, watchersOnline, isPrivate, nextPlayers, previousMoveAt } = game;
  const gameDataParsed: GameDataType = JSON.parse(game.gameData);
  const { players: gamePlayers }: { players: GamePlayerType[] } = gameDataParsed;

  const maxTimeOption = gameDataParsed.options.find(option => option.name === 'Max Time');
  const maxTime = BaseGame.getMaxTimeVariants()[maxTimeOption!.value];

  const isAbleToStart = game.players.length >= game.playersMin && game.players.length <= game.playersMax;

  const isAccessToRemove = game.createdBy && game.createdBy.id === currentUserId;

  const isAccessToRepeat = gamePlayers.some(gamePlayer => gamePlayer.id === currentUserId);

  return (
    <div>
      <div className="game-info-container">
        <Typography>
          <img
            src={`/images/${GamesServices[game.name].getNameWork()}.png`}
            className="game-info-img"
            onClick={handleLogoClick}
            title={`click to see ${game.name} game rules`}
            alt="game logo"
          />
        </Typography>

        <div className="game-info-players">
          <Typography>
            {isPrivate && <Lock />} #{game.number}: {game.name}
          </Typography>

          {game.state === GAME_NOT_STARTED && (
            <Typography>
              ({game.playersMin} min, {game.playersMax} max)
            </Typography>
          )}

          {gamePlayers.map((gamePlayer, index) => (
            <Typography key={index}>
              {playersOnline.some(playerOnline => playerOnline.id === gamePlayer.id) ? (
                <span className="player-online-dot game-green-dot" />
              ) : (
                <span className="player-online-dot game-red-dot" />
              )}

              {game.players.find(player => player.id === gamePlayer.id) &&
                game.players.find(player => player.id === gamePlayer.id)!.username}

              {game.players.find(player => player.id === gamePlayer.id) &&
                game.players.find(player => player.id === gamePlayer.id)!.country && (
                  <img
                    src={game.players.find(player => player.id === gamePlayer.id)!.country}
                    className="player-online-country"
                    alt="country flag"
                  />
                )}

              {nextPlayers.some(nextPlayer => nextPlayer.id === gamePlayer.id) && (
                <img src="/images/sandglass.gif" alt="sandglass" className="sandglass" />
              )}
            </Typography>
          ))}

          {watchersOnline.map((watcher, index) => (
            <Typography key={index}>
              <span className="player-dot game-green-dot" />
              {watcher.username}
            </Typography>
          ))}
        </div>

        {isRulesShown && <GameRules gameName={game.name} close={handleRulesClose} />}
      </div>

      {game.state === GAME_STARTED && <GameMoveTime previousMoveAt={previousMoveAt} maxTime={maxTime} />}

      {gameDataParsed.options && gameDataParsed.options.length > 0 && (
        <GameOptions
          game={game}
          isButtonsDisabled={isButtonsDisabled || game.state !== GAME_NOT_STARTED}
          updateOption={updateOption}
        />
      )}

      {game.state === GAME_NOT_STARTED && (
        <NewInvite
          currentUserId={currentUserId}
          gameId={game.id}
          users={users}
          newInvite={newInvite}
          isSecond={isAccessToRemove}
        />
      )}

      {game.state === GAME_NOT_STARTED && isAbleToStart && <StartGame start={handleStartClick} />}

      <CloseGame close={handleCloseClick} />

      {game.state === GAME_NOT_STARTED && <LeaveGame leave={handleLeaveClick} />}

      {isAccessToRepeat && game.state === GAME_FINISHED && <RepeatGame repeat={handleRepeatClick} />}

      {isAccessToRemove && <RemoveGame remove={handleRemoveClick} />}
    </div>
  );
}

GameInfo.propTypes = {
  game: object.isRequired,
  currentUserId: string.isRequired,
  isButtonsDisabled: bool.isRequired,
  users: array.isRequired,
  closeGame: func.isRequired,
  leaveGame: func.isRequired,
  startGame: func.isRequired,
  updateRemovingGame: func.isRequired,
  updateOption: func.isRequired,
  newInvite: func.isRequired,
};

GameInfo.defaultProps = {
  game: {},
  currentUserId: '',
  isButtonsDisabled: false,
  users: [],
  closeGame: () => null,
  leaveGame: () => null,
  startGame: () => null,
  updateRemovingGame: () => null,
  repeatGame: () => null,
  updateOption: () => null,
  newInvite: () => null,
};
