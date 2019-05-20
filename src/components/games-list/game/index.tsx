import moment from 'moment';
import React, { Fragment, useState } from 'react';
import { object, func } from 'prop-types';
import { Card, CardHeader, CardContent, Typography, IconButton, CardActions } from '@material-ui/core';
import { Gamepad, OpenInBrowser, RemoveRedEye, Lock } from '@material-ui/icons';
import { GAME_NOT_STARTED, GAME_STARTED, GAME_FINISHED, GAME_STATE_LABEL } from 'z-games-base-game';

import { GameRules } from '../../game-rules';
import { GamesServices } from '../../../services';
import { IGame, IUser } from '../../../interfaces';

import './index.scss';

export function Game({ game, currentUser, isButtonsDisabled, joinGame, openGame, watchGame }: {
  game: IGame;
  currentUser?: IUser;
  isButtonsDisabled: boolean;
  joinGame: (gameId: string) => void;
  openGame: (gameId: string) => void;
  watchGame: (gameId: string) => void;
}) {
  const [isRulesShown, setIsRulesShown] = useState(false);

  const { id: gameId, number: gameNumber, name, state, players, playersMax, createdAt, isPrivate } = game;

  const handleLogoClick = () => {
    setIsRulesShown(true);
  };

  const handleRulesClose = () => {
    setIsRulesShown(false);
  };

  const handleJoinClick = () => {
    joinGame(gameId);
  };

  const handleOpenClick = () => {
    openGame(gameId);
  };

  const handleWatchClick = () => {
    watchGame(gameId);
  };

  const isAbleToJoin = currentUser
    && (!isPrivate || currentUser.id === (game.createdBy && game.createdBy.id))
    && !state
    && players.length < playersMax
    && !players.some(player => player.id === currentUser.id);
  const isAbleToOpen = currentUser && players.some(player => player.id === currentUser.id);
  const isAbleToWatch = currentUser && !isPrivate && state > GAME_NOT_STARTED && !players.some(player => player.id === currentUser.id);

  const isGameWithCurrentUser = currentUser && game.players && game.players.some(gamePlayer => gamePlayer.id === currentUser.id);
  const isCurrentUserMove = currentUser && game.nextPlayers && game.nextPlayers.some(gamePlayer => gamePlayer.id === currentUser.id);

  return (
    <Fragment>
      <Card className='game-card'>
        <CardHeader
          title={`#${gameNumber}: ${name}`}
          subheader={moment(createdAt).fromNow()}
        />

        <div className='game-img-container'>
          <img
            src={`/images/${GamesServices[name].getNameWork()}.png`}
            className='game-img'
            onClick={handleLogoClick}
            title={`click to see ${name} game rules`}
            alt='game logo'
          />
        </div>

        <CardContent>

          <Typography>
            {isPrivate && <Lock />}
            {`by ${game.createdBy && game.createdBy.username}`}
          </Typography>

          <Typography>
            {players.length} {players.length === 1 ? 'player' : 'players'}{isGameWithCurrentUser && ' [with me]'}
          </Typography>

          <Typography>
            {state === GAME_NOT_STARTED && <span className='game-dot game-green-dot' />}
            {state === GAME_STARTED && <span className='game-dot game-yellow-dot' />}
            {state === GAME_FINISHED && <span className='game-dot game-red-dot' />}
            {GAME_STATE_LABEL[state]}{isCurrentUserMove && ' [my move!]'}
          </Typography>

        </CardContent>

        {currentUser && <CardActions>

          {isAbleToJoin && <IconButton onClick={handleJoinClick} disabled={isButtonsDisabled} title='Click to join the game' >
            <Gamepad />
          </IconButton>}

          {isAbleToOpen && <IconButton onClick={handleOpenClick} disabled={isButtonsDisabled} title='Click to open the game' >
            <OpenInBrowser />
          </IconButton>}

          {isAbleToWatch && <IconButton onClick={handleWatchClick} disabled={isButtonsDisabled} title='Click to watch the game' >
            <RemoveRedEye />
          </IconButton>}

        </CardActions>}

      </Card>

      {isRulesShown && <GameRules gameName={name} close={handleRulesClose} />}
    </Fragment>
  );
}

Game.propTypes = {
  game: object.isRequired,
  currentUser: object,
  joinGame: func.isRequired,
  openGame: func.isRequired,
  watchGame: func.isRequired,
};

Game.defaultProps = {
  game: {},
  joinGame: () => null,
  openGame: () => null,
  watchGame: () => null,
};
