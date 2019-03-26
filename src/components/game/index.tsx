import moment from 'moment';
import React, { Fragment, useState, ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { object, string, func, bool } from 'prop-types';
import { Card, CardHeader, CardContent, Typography, IconButton, CardActions } from '@material-ui/core';
import { Gamepad, OpenInBrowser, RemoveRedEye } from '@material-ui/icons';
import { GAME_NOT_STARTED, GAME_STARTED, GAME_FINISHED, GAME_STATE_LABEL } from 'z-games-base-game';

import { GameRules } from '../../components';
import { joinGame, openGame, watchGame, updateIsButtonsDisabled } from '../../actions';
import { IGame, GAMES_LOGOS, IUsersState, IGamesState } from '../../interfaces';

import './index.scss';

export function GamePure({ game, currentUsername, disableButtons, join, open, watch, isButtonsDisabled }: {
  game: IGame,
  currentUsername: string | undefined,
  isButtonsDisabled: boolean,
  join: (gameNumber: number) => void,
  open: (gameNumber: number) => void,
  watch: (gameNumber: number) => void,
  disableButtons: (isDisabled: boolean) => void,
}) {
  const [isRulesShown, setIsRulesShown] = useState(false);
  const [oldGameData, setOldGameData] = useState('');

  const { gameData } = game;

  if (gameData !== oldGameData) {
    disableButtons(false);
    setOldGameData(gameData);
  }

  const handleLogoClick = () => {
    setIsRulesShown(true);
  };

  const handleRulesClose = () => {
    setIsRulesShown(false);
  };

  const handleJoinClick = () => {
    join(game.number);
  };

  const handleOpenClick = () => {
    open(game.number);
  };

  const handleWatchClick = () => {
    watch(game.number);
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
  isDisableButtons: bool.isRequired,
  disableButtons: func.isRequired,
};

GamePure.defaultProps = {
  game: {},
  currentUsername: undefined,
  isDisableButtons: false,
  disableButtons: () => console.log,
};

const mapStateToProps = (state: { users: IUsersState, games: IGamesState }) => ({
  isButtonsDisabled: state.users.isButtonsDisabled,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  disableButtons: bindActionCreators(updateIsButtonsDisabled, dispatch),
  join: bindActionCreators(joinGame, dispatch),
  open: bindActionCreators(openGame, dispatch),
  watch: bindActionCreators(watchGame, dispatch),
});

export const Game = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamePure as ComponentType<any>);
