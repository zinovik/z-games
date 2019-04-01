import moment from 'moment';
import React, { Fragment, useState, ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { object, string } from 'prop-types';
import { Card, CardHeader, CardContent, Typography, IconButton, CardActions } from '@material-ui/core';
import { Gamepad, OpenInBrowser, RemoveRedEye } from '@material-ui/icons';
import { GAME_NOT_STARTED, GAME_STARTED, GAME_FINISHED, GAME_STATE_LABEL } from 'z-games-base-game';

import { GameRules } from '../../components';
import {
  joinGame as joinGameWithoutDispatch,
  openGame as openGameWithoutDispatch,
  watchGame as watchGameWithoutDispatch,
} from '../../actions';
import { IGame, GAMES_LOGOS, IState } from '../../interfaces';

import './index.scss';

export function GamePure({ game, currentUsername, isButtonsDisabled, joinGame, openGame, watchGame }: {
  game: IGame,
  currentUsername: string | undefined,
  isButtonsDisabled: boolean,
  joinGame: (gameNumber: number) => void,
  openGame: (gameNumber: number) => void,
  watchGame: (gameNumber: number) => void,
}) {
  const [isRulesShown, setIsRulesShown] = useState(false);

  const handleLogoClick = () => {
    setIsRulesShown(true);
  };

  const handleRulesClose = () => {
    setIsRulesShown(false);
  };

  const handleJoinClick = () => {
    joinGame(game.number);
  };

  const handleOpenClick = () => {
    openGame(game.number);
  };

  const handleWatchClick = () => {
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
          <img src={GAMES_LOGOS[game.name]} className='game-img' onClick={handleLogoClick} />
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

          {isAbleToJoin && <IconButton onClick={handleJoinClick} disabled={isButtonsDisabled || isButtonsDisabled} >
            <Gamepad />
          </IconButton>}

          {isAbleToOpen && <IconButton onClick={handleOpenClick} disabled={isButtonsDisabled || isButtonsDisabled} >
            <OpenInBrowser />
          </IconButton>}

          {isAbleToWatch && <IconButton onClick={handleWatchClick} disabled={isButtonsDisabled || isButtonsDisabled} >
            <RemoveRedEye />
          </IconButton>}

        </CardActions>}

      </Card>

      {isRulesShown && <GameRules gameName={game.name} close={handleRulesClose} />}
    </Fragment>
  );
};

GamePure.propTypes = {
  game: object.isRequired,
  currentUsername: string,
};

GamePure.defaultProps = {
  game: {},
  currentUsername: undefined,
};

const mapStateToProps = (state: IState) => ({
  isButtonsDisabled: state.users.isButtonsDisabled,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  joinGame: bindActionCreators(joinGameWithoutDispatch, dispatch),
  openGame: bindActionCreators(openGameWithoutDispatch, dispatch),
  watchGame: bindActionCreators(watchGameWithoutDispatch, dispatch),
});

export const Game = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamePure as ComponentType<any>);
