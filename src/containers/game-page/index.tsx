import React, { Component, Props } from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';

import { GameInfo, GameTable, Chat, Loading } from '../../components';
import { ZGamesApi } from '../../services';
import * as types from '../../constants';
import './index.css';

interface GamePageProps extends Props<{}> {
  currentUser: types.User,
  isConnected: boolean,
  game: types.Game,
  usersOnline: types.User[],
  match: { params: { number: string } },
}

class GamePage extends Component<GamePageProps, {}> {
  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  move = (moveString: string) => {
    const { game } = this.props;

    this.zGamesApi.makeMove({ gameNumber: game.number, move: moveString });
  };

  newMessage = (message: string) => {
    const { game } = this.props;

    this.zGamesApi.message({ gameId: game.id, message });
  };


  render() {
    const { currentUser, game, isConnected } = this.props;

    if (!currentUser || !game) {
      return null;
    }

    return (
      <main>
        <div className='game-page-container'>
          <div className='game-page-table'>
            <GameTable game={game} currentUser={currentUser} move={this.move} />
          </div>

          <div className='game-page-info-chat-container'>
            <div className='game-page-info-container'>
              <Paper className='game-page-info'>
                <GameInfo
                  game={game}
                  currentUserId={currentUser.id}
                  leave={() => { this.zGamesApi.leaveGame(game.number); }}
                  close={() => { this.zGamesApi.closeGame(game.number); }}
                  ready={() => { this.zGamesApi.readyToGame(game.number); }}
                  start={() => { this.zGamesApi.startGame(game.number); }}
                />
              </Paper>
            </div>

            <div className='game-page-chat-container'>
              <Paper className='game-page-chat'>
                <Chat logs={game.logs} newMessage={this.newMessage} />
              </Paper>
            </div>
          </div>
        </div>

        <Loading isConnected={isConnected} />
      </main>
    );
  }
}

const mapStateToProps = (state: { users: types.UsersState, games: types.GamesState }) => {
  return {
    usersOnline: state.users.usersOnline,
    isConnected: state.users.isConnected,
    currentUser: state.users.currentUser,
    game: state.games.openGame,
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamePage);
