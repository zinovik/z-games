import React, { Fragment, useState } from 'react';
import { object, string, func, bool } from 'prop-types';
import moment from 'moment';
import { Card, CardHeader, CardContent, Typography, IconButton, CardActions } from '@material-ui/core';
import { Gamepad, OpenInBrowser, RemoveRedEye } from '@material-ui/icons';

import { GameRules } from '../../components';
import * as types from '../../constants';
import './index.css';

export function Game({ game, currentUsername, isDisableButtons, join, open, watch, disableButtons }: {
  game: types.Game,
  currentUsername: string | undefined,
  isDisableButtons: boolean,
  join: () => void,
  open: () => void,
  watch: () => void,
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

    join();
  };

  const handleOpenClick = () => {
    disableButtons();

    setIsButtonsDisabled(true);

    open();
  };

  const handleWatchClick = () => {
    disableButtons();

    setIsButtonsDisabled(true);

    watch();
  };

  const isAbleToJoin = !game.state && game.players.length < game.playersMax && !game.players.some(player => player.username === currentUsername);
  const isAbleToOpen = game.players.some(player => player.username === currentUsername);
  const isAbleToWatch = game.state > types.GAME_NOT_STARTED && !game.players.some(player => player.username === currentUsername);

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
            {game.state === types.GAME_NOT_STARTED && <span className='game-dot game-green-dot' />}
            {game.state === types.GAME_STARTED && <span className='game-dot game-yellow-dot' />}
            {game.state === types.GAME_FINISHED && <span className='game-dot game-red-dot' />}
            {types.GAME_STATE_LABEL[game.state]}
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
  join: func.isRequired,
  open: func.isRequired,
  watch: func.isRequired,
  disableButtons: func.isRequired,
};

Game.defaultProps = {
  game: {},
  currentUsername: undefined,
  isDisableButtons: false,
  join: () => console.log,
  open: () => console.log,
  watch: () => console.log,
  disableButtons: () => console.log,
};
