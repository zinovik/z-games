import React, { Component, Props } from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';

import { GameTable, Chat } from '../../containers';
import { GameInfo } from '../../components';
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

  render() {
    const { currentUser, game } = this.props;

    if (!currentUser || !game) {
      return null;
    }

    return (
      <main>
        <div className='game-page-container'>
          <div className='game-page-table'>
            <Paper>
              <GameTable game={game} currentUser={currentUser} move={this.zGamesApi.makeMove} />
            </Paper>
          </div>

          <div className='game-page-info-and-chat'>
            <Paper>
              <GameInfo
                game={game}
                currentUserId={currentUser.id}
                leave={() => { this.zGamesApi.leaveGame(game.number); }}
                close={() => { this.zGamesApi.closeGame(game.number); }}
                ready={() => { this.zGamesApi.readyToGame(game.number); }}
                start={() => { this.zGamesApi.startGame(game.number); }}
              />
            </Paper>

            <Paper>
              <Chat logs={game.logs} newMessage={this.zGamesApi.message} />
            </Paper>
          </div>
        </div>

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
