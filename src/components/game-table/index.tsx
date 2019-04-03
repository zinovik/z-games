import React, { Fragment } from 'react';
import { object, bool, func } from 'prop-types';
import { GAME_STARTED, GAME_FINISHED } from 'z-games-base-game';
import { NAME as NO_THANKS } from 'z-games-no-thanks';
import { NAME as PERUDO } from 'z-games-perudo';
import { NAME as LOST_CITIES } from 'z-games-lost-cities';

import { GamePlayers } from '../../components/game-players';
import { GamePlayer } from '../../components/game-player';
import { GameResults } from '../../components/game-results';
import { NoThanks } from '../../components/games/no-thanks';
import { Perudo } from '../../components/games/perudo';
import { LostCities } from '../../components/games/lost-cities';
import { GamesServices } from '../../services';
import { IGame, IUser, GameDataType, GamePlayerType } from '../../interfaces';

import './index.scss';

export function GameTable({ game, currentUser, isButtonsDisabled, makeMove }: {
  game: IGame,
  currentUser: IUser,
  isButtonsDisabled: boolean,
  makeMove: ({ gameNumber, move }: { gameNumber: number, move: string }) => void,
}) {
  const { name, state, gameData, players, nextPlayers } = game;
  const gameDataParsed: GameDataType = JSON.parse(gameData);
  const gamePlayers: GamePlayerType[] = gameDataParsed.players;
  const isMyTurn = nextPlayers.some(nextPlayer => nextPlayer.id === currentUser.id);
  const isPlayer = players.some(player => player.id === currentUser.id);

  const gameNameInStyle = GamesServices[name].getNameWork();

  return (
    <Fragment>
      {game.state === GAME_STARTED && <div className='game-table-container'>

        <GamePlayers
          gameName={name}
          currentUserId={currentUser.id}
          gamePlayers={gamePlayers}
          players={players}
          nextPlayers={nextPlayers}
        />

        <div className={`game-table-center game-table-center-${gameNameInStyle}`}>
          {name === NO_THANKS && <NoThanks
            game={game}
            currentUser={currentUser}
            isMyTurn={isMyTurn}
            isButtonsDisabled={isButtonsDisabled}
            makeMove={makeMove}
          />}
          {name === PERUDO && <Perudo
            game={game}
            currentUser={currentUser}
            isMyTurn={isMyTurn}
            isButtonsDisabled={isButtonsDisabled}
            makeMove={makeMove}
          />}
          {name === LOST_CITIES && <LostCities
            game={game}
            currentUser={currentUser}
            isMyTurn={isMyTurn}
            isButtonsDisabled={isButtonsDisabled}
            makeMove={makeMove}
          />}
        </div>

        {isPlayer && <GamePlayer
          gameName={name}
          username={currentUser.username}
          avatar={currentUser.avatar}
          active={nextPlayers.some(nextPlayer => nextPlayer.id === currentUser.id)}
          gamePlayer={gamePlayers.find(gamePlayer => gamePlayer.id === currentUser.id)}
        />}

      </div>}

      {state === GAME_FINISHED && <GameResults gameName={name} players={players} gamePlayers={gamePlayers || []} />}
    </Fragment>
  );
};

GameTable.propTypes = {
  game: object.isRequired,
  currentUser: object.isRequired,
  isButtonsDisabled: bool.isRequired,
  makeMove: func.isRequired,
};

GameTable.defaultProps = {
  game: {},
  currentUser: {},
  isButtonsDisabled: false,
  makeMove: () => null,
};
