import React, { ComponentType } from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';

import { GameInfo, GameTable, Chat } from '../../components';
import { IUser, IGame, IUsersState, IGamesState } from '../../interfaces';

import './index.scss';

function GamePagePure({ currentUser, game }: {
  currentUser: IUser,
  game: IGame,
  history: History,
}) {
  if (!currentUser || !game) {
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
    </main>
  );
}

const mapStateToProps = (state: { users: IUsersState, games: IGamesState }) => ({
  currentUser: state.users.currentUser,
  game: state.games.openGame,
});

const mapDispatchToProps = () => ({
});

export const GamePage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamePagePure) as ComponentType<any>);
