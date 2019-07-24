import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';
import { Paper } from '@material-ui/core';
import { GAME_NOT_STARTED } from 'z-games-base-game';
import { History } from 'history';

import { GameInfo } from '../../components/game-info';
import { GameTable } from '../../components/game-table';
import { Chat } from '../../components/chat';
import {
  closeGame as closeGameWithoutDispatch,
  leaveGame as leaveGameWithoutDispatch,
  readyToGame as readyToGameWithoutDispatch,
  startGame as startGameWithoutDispatch,
  sendMessage as sendMessageWithoutDispatch,
  makeMove as makeMoveWithoutDispatch,
  updateRemovingGame as updateRemovingGameWithoutDispatch,
  repeatGame as repeatGameWithoutDispatch,
  updateOption as updateOptionWithoutDispatch,
  newInvite as newInviteWithoutDispatch,
} from '../../actions';
import { IUser, IGame, IState } from '../../interfaces';

import './index.scss';

function GamePagePure({
  currentUser,
  game,
  isButtonsDisabled,
  users,
  closeGame,
  leaveGame,
  readyToGame,
  startGame,
  sendMessage,
  makeMove,
  updateRemovingGame,
  repeatGame,
  updateOption,
  newInvite,
}: {
  match: { params: { number: string } };
  currentUser: IUser;
  game: IGame;
  isButtonsDisabled: boolean;
  users: IUser[];
  history: History;
  closeGame: () => void;
  leaveGame: (gameId: string) => void;
  readyToGame: () => void;
  startGame: (gameId: string) => void;
  updateRemovingGame: (gameId: string) => void;
  repeatGame: (gameId: string) => void;
  sendMessage: ({ gameId, message }: { gameId: string; message: string }) => void;
  makeMove: ({ gameId, move }: { gameId: string; move: string }) => void;
  updateOption: ({ gameId, name, value }: { gameId: string; name: string; value: string }) => void;
  newInvite: (data: { gameId: string; userId: string }) => void;
}) {
  if (!game || !currentUser) {
    return null;
  }

  return (
    <main>
      <div className="game-page-container">
        <div className={`game-page-table${game.state === GAME_NOT_STARTED ? ' game-page-table-not-started' : ''}`}>
          <GameTable game={game} currentUser={currentUser} isButtonsDisabled={isButtonsDisabled} makeMove={makeMove} />
        </div>

        <div className="game-page-info-chat-container">
          <div className="game-page-info-container">
            <Paper className="game-page-info">
              <GameInfo
                game={game}
                currentUserId={currentUser.id}
                isButtonsDisabled={isButtonsDisabled}
                users={users}
                closeGame={closeGame}
                leaveGame={leaveGame}
                readyToGame={readyToGame}
                startGame={startGame}
                updateRemovingGame={updateRemovingGame}
                repeatGame={repeatGame}
                updateOption={updateOption}
                newInvite={newInvite}
              />
            </Paper>
          </div>

          <div className="game-page-chat-container">
            <Paper className="game-page-chat">
              <Chat logs={game.logs} gameId={game.id} sendMessage={sendMessage} />
            </Paper>
          </div>
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = (state: IState) => ({
  currentUser: state.users.currentUser,
  game: state.games.openGame,
  isButtonsDisabled: state.users.isButtonsDisabled,
  users: state.users.usersOnline.users,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeGame: bindActionCreators(closeGameWithoutDispatch, dispatch),
  leaveGame: bindActionCreators(leaveGameWithoutDispatch, dispatch),
  readyToGame: bindActionCreators(readyToGameWithoutDispatch, dispatch),
  startGame: bindActionCreators(startGameWithoutDispatch, dispatch),
  sendMessage: bindActionCreators(sendMessageWithoutDispatch, dispatch),
  makeMove: bindActionCreators(makeMoveWithoutDispatch, dispatch),
  updateRemovingGame: bindActionCreators(updateRemovingGameWithoutDispatch, dispatch),
  repeatGame: bindActionCreators(repeatGameWithoutDispatch, dispatch),
  updateOption: bindActionCreators(updateOptionWithoutDispatch, dispatch),
  newInvite: bindActionCreators(newInviteWithoutDispatch, dispatch),
});

export const GamePage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamePagePure as ComponentType<any>) as ComponentType<any>);
