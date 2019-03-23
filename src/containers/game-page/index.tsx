import React, { ComponentType } from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';

import { GameInfo, GameTable, Chat, Loading } from '../../components';
import * as types from '../../constants';

import './index.scss';

function GamePagePure({ currentUser, isConnected, game, history }: {
  currentUser: types.IUser,
  isConnected: boolean,
  game: types.IGame,
  history: History,
}) {
  if (!currentUser || !game) {
    history.push('/games');
    return null;
  }

  return (
    <main>
      <div className='game-page-container'>
        <div className='game-page-table'>
          <GameTable game={game} currentUser={currentUser} />
        </div>

        <div className='game-page-info-chat-container'>
          <div className='game-page-info-container'>
            <Paper className='game-page-info'>
              <GameInfo
                game={game}
                currentUserId={currentUser.id}
              />
            </Paper>
          </div>

          <div className='game-page-chat-container'>
            <Paper className='game-page-chat'>
              <Chat logs={game.logs} gameId={game.id} />
            </Paper>
          </div>
        </div>
      </div>

      <Loading isConnected={isConnected} text='Connecting to the server...' />
    </main>
  );
}

const mapStateToProps = (state: { users: types.IUsersState, games: types.IGamesState }) => {
  return {
    isConnected: state.users.isConnected,
    currentUser: state.users.currentUser,
    game: state.games.openGame,
  };
};

const mapDispatchToProps = {
};

export const GamePage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamePagePure) as ComponentType<any>);
