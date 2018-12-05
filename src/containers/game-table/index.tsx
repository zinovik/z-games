import React, { Fragment } from 'react';
import { object, func } from 'prop-types';

import { NoThanks, Perudo } from '../../containers';
import { GamePlayers, GamePlayer, GameResults } from '../../components';
import * as types from '../../constants';
import './index.css';

GameTable.propTypes = {
  game: object.isRequired,
  currentUser: object.isRequired,
  move: func.isRequired,
}

GameTable.defaultProps = {
  game: {},
  currentUser: {},
  move: () => console.log,
}

export function GameTable({ game, currentUser, move }: {
  game: types.Game,
  currentUser: types.User,
  move: (move: string) => void,
}) {
  const { name, state, gameData, players, nextPlayers } = game;
  const playersInGame = JSON.parse(gameData).players;
  const { cards, chips, points, dices } = playersInGame.find((playerInGame: types.PlayerInGame) => playerInGame.id === currentUser.id) || { cards: [], chips: 0, points: 0, dices: [] };
  const isMyTurn = nextPlayers.some(nextPlayer => nextPlayer.id === currentUser.id);

  return (
    <Fragment>
      {game.state === types.GAME_STARTED && <div className='game-table-container'>

        <GamePlayers
          gameName={name}
          currentUserId={currentUser.id}
          playersInGame={playersInGame}
          players={players}
          nextPlayers={nextPlayers}
        />

        <div className={`game-table-center game-table-center-${name === types.NO_THANKS ? 'no-thanks' : ''}${name === types.PERUDO ? 'perudo' : ''}`}>
          {name === types.NO_THANKS && <NoThanks game={game} currentUser={currentUser} isMyTurn={isMyTurn} move={move} />}
          {name === types.PERUDO && <Perudo game={game} currentUser={currentUser} isMyTurn={isMyTurn} move={move} />}
        </div>

        <GamePlayer
          gameName={name}
          username={currentUser.username}
          cards={cards}
          chips={chips}
          points={points}
          dices={dices}
          active={nextPlayers.some(nextPlayer => nextPlayer.id === currentUser.id)}
        />

      </div>}

      {state === types.GAME_FINISHED && <GameResults gameName={name} players={players} playersInGame={playersInGame || []} />}
    </Fragment>
  );
}
