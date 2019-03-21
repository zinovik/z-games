import React, { Fragment, useState } from 'react';
import { object, string, func, bool } from 'prop-types';
import moment from 'moment';
import { Card, CardHeader, CardContent, Typography, IconButton, CardActions } from '@material-ui/core';
import { Gamepad, OpenInBrowser, RemoveRedEye } from '@material-ui/icons';
import { GAME_NOT_STARTED, GAME_STARTED, GAME_FINISHED, GAME_STATE_LABEL } from 'z-games-base-game';

import { GameRules } from '../../components';
import { joinGame, openGame, watchGame } from '../../services';
import * as types from '../../constants';

import './index.scss';

export function Game({ game, currentUsername, isDisableButtons, disableButtons }: {
  game: types.IGame,
  currentUsername: string | undefined,
  isDisableButtons: boolean,
  disableButtons: () => void,
}) {
  const [isRulesShown, setIsRulesShown] = useState(false);
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);
  const [oldGameData, setOldGameData] = useState('');

  const { gameData } = game;

  if (gameData !== oldGameData) {
    setIsButtonsDisabled(false);
    setOldGameData(gameData);
  }

  const handleLogoClick = () => {
    setIsRulesShown(true);
  };

  const handleRulesClose = () => {
    setIsRulesShown(false);
  };

  const handleJoinClick = () => {
    disableButtons();

    setIsButtonsDisabled(true);

    joinGame(game.number);
  };

  const handleOpenClick = () => {
    disableButtons();

    setIsButtonsDisabled(true);

    openGame(game.number);
  };

  const handleWatchClick = () => {
    disableButtons();

    setIsButtonsDisabled(true);

    watchGame(game.number);
  };

  const isAbleToJoin = !game.state && game.players.length < game.playersMax && !game.players.some(player => player.username === currentUsername);
  const isAbleToOpen = game.players.some(player => player.username === currentUsername);
  const isAbleToWatch = game.state > GAME_NOT_STARTED && !game.players.some(player => player.username === currentUsername);

  return (
    <Fragment>
      <Card className='game-card'>
        <CardHeader
          title={`${game.name} (${game.number})`}
          subheader={moment(game.createdAt).fromNow()}
        />

        <div className='game-img-container'>
          <img src={types.GAMES_LOGOS[game.name]} className='game-img' onClick={handleLogoClick} />
        </div>

        <CardContent>

          <Typography>
            {game.players.length} {game.players.length === 1 ? 'player' : 'players'}
          </Typography>

          <Typography>
            {game.state === GAME_NOT_STARTED && <span className='game-dot game-green-dot' />}
            {game.state === GAME_STARTED && <span className='game-dot game-yellow-dot' />}
            {game.state === GAME_FINISHED && <span className='game-dot game-red-dot' />}
            {GAME_STATE_LABEL[game.state]}
          </Typography>

        </CardContent>

        {currentUsername && <CardActions>

          {isAbleToJoin && <IconButton onClick={handleJoinClick} disabled={isButtonsDisabled || isDisableButtons} >
            <Gamepad />
          </IconButton>}

          {isAbleToOpen && <IconButton onClick={handleOpenClick} disabled={isButtonsDisabled || isDisableButtons} >
            <OpenInBrowser />
          </IconButton>}

          {isAbleToWatch && <IconButton onClick={handleWatchClick} disabled={isButtonsDisabled || isDisableButtons} >
            <RemoveRedEye />
          </IconButton>}

        </CardActions>}

      </Card>

      {isRulesShown && <GameRules gameName={game.name} close={handleRulesClose} />}
    </Fragment>
  );
};

Game.propTypes = {
  game: object.isRequired,
  currentUsername: string,
  isDisableButtons: bool.isRequired,
  disableButtons: func.isRequired,
};

Game.defaultProps = {
  game: {},
  currentUsername: undefined,
  isDisableButtons: false,
  disableButtons: () => console.log,
};
