import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { GAME_STARTED, GAME_FINISHED } from 'z-games-base-game';
import { NoThanksPlayer, NO_THANKS } from 'z-games-no-thanks';
import { PerudoPlayer, PERUDO } from 'z-games-perudo';
import { LOST_CITIES } from 'z-games-lost-cities';

import { GamePlayers, GamePlayer, GameResults, NoThanks, Perudo, LostCities } from '../../components';
import * as types from '../../constants';

import './index.scss';

GameTable.propTypes = {
  game: object.isRequired,
  currentUser: object.isRequired,
}

GameTable.defaultProps = {
  game: {},
  currentUser: {},
}

export function GameTable({ game, currentUser }: {
  game: types.IGame,
  currentUser: types.IUser,
}) {
  const { name, state, gameData, players, nextPlayers } = game;
  const gameDataParsed: types.GameData = JSON.parse(gameData);
  const playersInGame: types.GamePlayer[] = gameDataParsed.players;
  const { cards, chips, points, dices } = (playersInGame.find(
    (playerInGame: types.GamePlayer) => playerInGame.id === currentUser.id,
  ) || { cards: [], chips: 0, points: 0, dices: [] } ) as PerudoPlayer & NoThanksPlayer;
  const isMyTurn = nextPlayers.some(nextPlayer => nextPlayer.id === currentUser.id);
  const isPlayer = players.some(player => player.id === currentUser.id);

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

        <div className={`
          game-table-center
          game-table-center-${name === NO_THANKS ? 'no-thanks' : ''}${name === PERUDO ? 'perudo' : ''}
        `}>
          {name === NO_THANKS && <NoThanks game={game} currentUser={currentUser} isMyTurn={isMyTurn} />}
          {name === PERUDO && <Perudo game={game} currentUser={currentUser} isMyTurn={isMyTurn} />}
          {name === LOST_CITIES && <LostCities game={game} currentUser={currentUser} isMyTurn={isMyTurn} />}
        </div>

        {isPlayer && <GamePlayer
          gameName={name}
          username={currentUser.username}
          avatar={currentUser.avatar}
          cards={cards}
          chips={chips}
          points={points}
          dices={dices}
          active={nextPlayers.some(nextPlayer => nextPlayer.id === currentUser.id)}
        />}

      </div>}

      {state === GAME_FINISHED && <GameResults gameName={name} players={players} playersInGame={playersInGame || []} />}
    </Fragment>
  );
}
