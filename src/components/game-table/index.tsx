import React, { Fragment, useState } from 'react';
import { object, bool, func } from 'prop-types';
import { GAME_STARTED, GAME_FINISHED } from 'z-games-base-game';
import { NAME as NO_THANKS } from 'z-games-no-thanks';
import { NAME as PERUDO } from 'z-games-perudo';
import { NAME as LOST_CITIES } from 'z-games-lost-cities';
import { NAME as SIX_NIMMT } from 'z-games-six-nimmt';

import { GamePlayers } from './game-players';
import { GamePlayer } from '../game-player';
import { GameResults } from '../game-results';
import { NoThanks } from '../games/no-thanks';
import { Perudo } from '../games/perudo';
import { LostCities } from '../games/lost-cities';
import { SixNimmt } from '../games/six-nimmt';
import { IGame, IUser, GameDataType, GamePlayerType } from '../../interfaces';

import './index.scss';

export function GameTable({ game, currentUser, isButtonsDisabled, makeMove }: {
  game: IGame;
  currentUser: IUser;
  isButtonsDisabled: boolean;
  makeMove: (parameters: { gameId: string, move: string }) => void;
}) {
  const [oldGameData, setOldGameData] = useState('');

  const { name, state, gameData, players, nextPlayers } = game;

  if (gameData !== oldGameData) {
    window.scrollTo(0, 0);
    setOldGameData(gameData);
  }

  const gameDataParsed: GameDataType = JSON.parse(gameData);
  const gamePlayers: GamePlayerType[] = gameDataParsed.players;
  const isMyTurn = nextPlayers.some(nextPlayer => nextPlayer.id === currentUser.id);
  const isPlayer = players.some(player => player.id === currentUser.id);

  return (
    <Fragment>
      {game.state === GAME_STARTED && <div className='game-table-container'>

        <GamePlayers
          game={game}
          currentUserId={currentUser.id}
          gamePlayers={gamePlayers}
          players={players}
          nextPlayers={nextPlayers}
        />

        <div className='game-table-center'>

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

          {name === SIX_NIMMT && <SixNimmt
            game={game}
            currentUser={currentUser}
            isMyTurn={isMyTurn}
            isButtonsDisabled={isButtonsDisabled}
            makeMove={makeMove}
          />}

        </div>

        <div>
          {isPlayer && <GamePlayer
            game={game}
            username={currentUser.username}
            avatar={currentUser.avatar}
            active={nextPlayers.some(nextPlayer => nextPlayer.id === currentUser.id)}
            gamePlayer={gamePlayers.find(gamePlayer => gamePlayer.id === currentUser.id)}
            isCurrentPlayer={true}
            isMyTurn={isMyTurn}
          />}
        </div>

      </div>}

      {state === GAME_FINISHED && <GameResults game={game} players={players} gamePlayers={gamePlayers || []} />}
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
