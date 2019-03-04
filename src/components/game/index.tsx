import React, { Component, Props, Fragment } from 'react';
import { object, string, func, bool } from 'prop-types';
import moment from 'moment';
import { Card, CardHeader, CardContent, Typography, IconButton, CardActions } from '@material-ui/core';
import { Gamepad, OpenInBrowser, RemoveRedEye } from '@material-ui/icons';

import { GameRules } from '../../components';
import * as types from '../../constants';
import './index.css';

interface GameProps extends Props<{}> {
  game: types.Game,
  currentUsername: string | undefined,
  isDisableButtons: boolean,
  join: () => void,
  open: () => void,
  watch: () => void,
  disableButtons: () => void,
}

interface GameState extends Props<{}> {
  isRulesShown: boolean,
  isButtonsDisabled: boolean,
  oldGameData: string,
}

export class Game extends Component<GameProps, GameState> {

  static propTypes = {
    game: object.isRequired,
    currentUsername: string,
    isDisableButtons: bool.isRequired,
    join: func.isRequired,
    open: func.isRequired,
    watch: func.isRequired,
    disableButtons: func.isRequired,
  }

  static defaultProps = {
    game: {},
    currentUsername: undefined,
    isDisableButtons: false,
    join: () => console.log,
    open: () => console.log,
    watch: () => console.log,
    disableButtons: () => console.log,
  }

  static getDerivedStateFromProps = (nextProps: GameProps, prevState: GameState) => {
    const { oldGameData } = prevState;
    const { game } = nextProps;
    const { gameData } = game;

    if (gameData === oldGameData) {
      return null;
    }

    return { isButtonsDisabled: false, oldGameData: nextProps.game.gameData };
  };

  state = {
    isRulesShown: false,
    isButtonsDisabled: false,
    oldGameData: '',
  };

  handleLogoClick = () => {
    this.setState({ isRulesShown: true });
  };

  handleRulesClose = () => {
    this.setState({ isRulesShown: false });
  };

  handleJoinClick = () => {
    const { join, disableButtons } = this.props;

    disableButtons();
    this.setState({ isButtonsDisabled: true });

    join();
  };

  handleOpenClick = () => {
    const { open, disableButtons } = this.props;

    disableButtons();
    this.setState({ isButtonsDisabled: true });

    open();
  };

  handleWatchClick = () => {
    const { watch, disableButtons } = this.props;

    disableButtons();
    this.setState({ isButtonsDisabled: true });

    watch();
  };

  render() {
    const { game, currentUsername, isDisableButtons } = this.props;
    const { isRulesShown, isButtonsDisabled } = this.state;

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
            <img src={types.GAMES_LOGOS[game.name]} className='game-img' onClick={this.handleLogoClick} />
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

            {isAbleToJoin && <IconButton onClick={this.handleJoinClick} disabled={isButtonsDisabled || isDisableButtons} >
              <Gamepad />
            </IconButton>}

            {isAbleToOpen && <IconButton onClick={this.handleOpenClick} disabled={isButtonsDisabled || isDisableButtons} >
              <OpenInBrowser />
            </IconButton>}

            {isAbleToWatch && <IconButton onClick={this.handleWatchClick} disabled={isButtonsDisabled || isDisableButtons} >
              <RemoveRedEye />
            </IconButton>}

          </CardActions>}

        </Card>

        {isRulesShown && <GameRules gameName={game.name} close={this.handleRulesClose} />}
      </Fragment>
    );

  }

}
