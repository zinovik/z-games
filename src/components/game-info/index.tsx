import React, { Component, Props, Fragment } from 'react';
import { object, string, func } from 'prop-types';
import { Button, Typography } from '@material-ui/core';

import { GameRules } from '../../components';
import * as types from '../../constants';
import './index.css';

interface GameInfoProps extends Props<{}> {
  game: types.Game,
  currentUserId: string,
  leave: () => void,
  close: () => void,
  ready: () => void,
  start: () => void,
}

interface GameInfoState extends Props<{}> {
  isRulesShown: boolean,
}

export class GameInfo extends Component<GameInfoProps, GameInfoState> {

  static propTypes = {
    game: object.isRequired,
    currentUserId: string.isRequired,
    leave: func.isRequired,
    close: func.isRequired,
    ready: func.isRequired,
    start: func.isRequired,
  }

  static defaultProps = {
    game: {},
    currentUserId: 'user-id',
    leave: () => console.log,
    close: () => console.log,
    ready: () => console.log,
    start: () => console.log,
  }

  state = {
    isRulesShown: false,
  };

  handleLogoClick = () => {
    this.setState({ isRulesShown: true });
  };

  handleRulesClose = () => {
    this.setState({ isRulesShown: false });
  };

  render() {
    const { game, currentUserId, leave, close, ready, start } = this.props;
    const { isRulesShown } = this.state;

    const { playersOnline, watchers } = game;
    const { players: playersInGame } = JSON.parse(game.gameData);

    const isAbleToStart = game.players.length >= game.playersMin
      && game.players.length <= game.playersMax
      && playersInGame.every((playerInGame: types.PlayerInGame) => playerInGame.ready);

    return (
      <div className='game-info-container'>
        <Typography>
          <img src={types.GAMES_LOGOS[game.name]} className='game-info-img' onClick={this.handleLogoClick} />
        </Typography>

        <div className='game-info-players'>
          <Typography>
            Players
          </Typography>

          {game.state === types.GAME_NOT_STARTED && <Typography>
            ({game.playersMin} min, {game.playersMax} max)
          </Typography>}

          {playersInGame.map((playerInGame: types.PlayerInGame, index: number) => (
            <Typography key={index}>

              {playersOnline.some((playerOnline: types.User) => playerOnline.id === playerInGame.id) ?
                (playerInGame.ready ?
                  <span className='player-dot game-green-dot' /> :
                  <span className='player-dot game-yellow-dot' />) :
                <span className='player-dot game-red-dot' />
              }

              {game.players.find(player => player.id === playerInGame.id)!.username}
            </Typography>
          ))}

          {!!watchers.length && <Typography>
            Watchers
          </Typography>}

          {watchers.map((watcher: types.User, index: number) => (
            <Typography key={index}>
              <span className='player-dot game-green-dot' />
              {watcher.username}
            </Typography>
          ))}
        </div>

        <div className='game-info-buttons'>
          <Button onClick={close}>Close</Button>

          {game.state === types.GAME_NOT_STARTED && <Button onClick={leave}>Leave</Button>}

          {game.state === types.GAME_NOT_STARTED && <Fragment>
            <Button onClick={ready}>
              {playersInGame.find((playerInGame: types.PlayerInGame) => playerInGame.id === currentUserId).ready ? 'Not Ready' : 'Ready'}
            </Button>
            <Button onClick={start} disabled={!isAbleToStart}>Start</Button>
          </Fragment>}
        </div>

        {isRulesShown && <GameRules gameName={game.name} close={this.handleRulesClose} />}

      </div>
    );
  }

};
