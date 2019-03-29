import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { GAME_STARTED, GAME_FINISHED } from 'z-games-base-game';
import { NO_THANKS } from 'z-games-no-thanks';
import { PERUDO } from 'z-games-perudo';
import { LOST_CITIES } from 'z-games-lost-cities';

import { GamePlayers, GamePlayer, GameResults, NoThanks, Perudo, LostCities } from '../../components';
import { IGame, IUser, GameDataType, GamePlayerType } from '../../interfaces';

import './index.scss';

export function GameTable({ game, currentUser }: {
  game: IGame,
  currentUser: IUser,
}) {
  const { name, state, gameData, players, nextPlayers } = game;
  const gameDataParsed: GameDataType = JSON.parse(gameData);
  const playersInGame: GamePlayerType[] = gameDataParsed.players;
  const isMyTurn = nextPlayers.some(nextPlayer => nextPlayer.id === currentUser.id);
  const isPlayer = players.some(player => player.id === currentUser.id);

  let gameNameInStyle = '';

  switch (name) {
    case NO_THANKS:
      gameNameInStyle = 'no-thanks';
      break;
    case PERUDO:
      gameNameInStyle = 'perudo';
      break;
    case LOST_CITIES:
      gameNameInStyle = 'lost-cities';
      break;
  }

  return (
    <Fragment>
      {game.state === GAME_STARTED && <div className='game-table-container'>

        <GamePlayers
          gameName={name}
          currentUserId={currentUser.id}
          playersInGame={playersInGame}
          players={players}
          nextPlayers={nextPlayers}
        />

        <div className={`game-table-center game-table-center-${gameNameInStyle}`}>
          {name === NO_THANKS && <NoThanks game={game} currentUser={currentUser} isMyTurn={isMyTurn} />}
          {name === PERUDO && <Perudo game={game} currentUser={currentUser} isMyTurn={isMyTurn} />}
          {name === LOST_CITIES && <LostCities game={game} currentUser={currentUser} isMyTurn={isMyTurn} />}
        </div>

        {isPlayer && <GamePlayer
          gameName={name}
          username={currentUser.username}
          avatar={currentUser.avatar}
          active={nextPlayers.some(nextPlayer => nextPlayer.id === currentUser.id)}
          gamePlayer={playersInGame.find(playerInGame => playerInGame.id === currentUser.id)}
        />}

      </div>}

      {state === GAME_FINISHED && <GameResults gameName={name} players={players} playersInGame={playersInGame || []} />}
    </Fragment>
  );
};

GameTable.propTypes = {
  game: object.isRequired,
  currentUser: object.isRequired,
};

GameTable.defaultProps = {
  game: {},
  currentUser: {},
};
