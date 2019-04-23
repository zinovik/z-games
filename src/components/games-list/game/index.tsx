import moment from 'moment';
import React, { Fragment, useState } from 'react';
import { object, func } from 'prop-types';
import { Card, CardHeader, CardContent, Typography, IconButton, CardActions } from '@material-ui/core';
import { Gamepad, OpenInBrowser, RemoveRedEye } from '@material-ui/icons';
import { GAME_NOT_STARTED, GAME_STARTED, GAME_FINISHED, GAME_STATE_LABEL } from 'z-games-base-game';

import { GameRules } from '../../game-rules';
import { GamesServices } from '../../../services';
import { IGame, IUser } from '../../../interfaces';

import './index.scss';

export function Game({ game, currentUser, isButtonsDisabled, joinGame, openGame, watchGame }: {
  game: IGame,
  currentUser?: IUser,
  isButtonsDisabled: boolean,
  joinGame: (gameNumber: number) => void,
  openGame: (gameNumber: number) => void,
  watchGame: (gameNumber: number) => void,
}) {
  const [isRulesShown, setIsRulesShown] = useState(false);

  const { number: gameNumber, name, state, players, playersMax, createdAt } = game;

  const handleLogoClick = () => {
    setIsRulesShown(true);
  };

  const handleRulesClose = () => {
    setIsRulesShown(false);
  };

  const handleJoinClick = () => {
    joinGame(gameNumber);
  };

  const handleOpenClick = () => {
    openGame(gameNumber);
  };

  const handleWatchClick = () => {
    watchGame(gameNumber);
  };

  const isAbleToJoin = currentUser && !state && players.length < playersMax && !players.some(player => player.id === currentUser.id);
  const isAbleToOpen = currentUser && players.some(player => player.id === currentUser.id);
  const isAbleToWatch = currentUser && state > GAME_NOT_STARTED && !players.some(player => player.id === currentUser.id);

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
          />
        </div>

        <CardContent>

          <Typography>
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

          {isAbleToJoin && <IconButton onClick={handleJoinClick} disabled={isButtonsDisabled} title='Click to join game' >
            <Gamepad />
          </IconButton>}

          {isAbleToOpen && <IconButton onClick={handleOpenClick} disabled={isButtonsDisabled} title='Click to open game' >
            <OpenInBrowser />
          </IconButton>}

          {isAbleToWatch && <IconButton onClick={handleWatchClick} disabled={isButtonsDisabled} title='Click to watch game' >
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
