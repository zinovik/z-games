import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Paper } from '@material-ui/core';
import { GAME_NOT_STARTED } from 'z-games-base-game';

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
  removeGameUser as removeGameWithoutDispatch,
  repeatGame as repeatGameWithoutDispatch,
  updateOption as updateOptionWithoutDispatch,
} from '../../actions';
import { IUser, IGame, IState } from '../../interfaces';

import './index.scss';

function GamePagePure({
  currentUser,
  game,
  isButtonsDisabled,
  closeGame,
  leaveGame,
  readyToGame,
  startGame,
  sendMessage,
  makeMove,
  removeGame,
  repeatGame,
  updateOption,
}: {
  currentUser: IUser,
  game: IGame,
  isButtonsDisabled: boolean,
  closeGame: () => void,
  leaveGame: (gameNumber: number) => void,
  readyToGame: () => void,
  startGame: (gameNumber: number) => void,
  removeGame: (gameNumber: number) => void,
  repeatGame: (gameNumber: number) => void,
  sendMessage: ({ gameId, message }: { gameId: string, message: string }) => void,
  makeMove: ({ gameNumber, move }: { gameNumber: number, move: string }) => void,
  updateOption: ({ gameNumber, name, value }: { gameNumber: number, name: string, value: string }) => void,
}) {
  if (!currentUser || !game) {
    return null;
  }

  const handleBrowserBackButton = () => {
    closeGame();
  };

  useEffect(() => {
    window.addEventListener('popstate', handleBrowserBackButton);

    return function cleanup() {
      window.removeEventListener('popstate', handleBrowserBackButton);
    };
  });

  return (
    <main>
      <div className='game-page-container'>
        <div className={`game-page-table${game.state === GAME_NOT_STARTED ? ' game-page-table-not-started' : ''}`}>
          <GameTable
            game={game}
            currentUser={currentUser}
            isButtonsDisabled={isButtonsDisabled}
            makeMove={makeMove}
          />
        </div>

        <div className='game-page-info-chat-container'>
          <div className='game-page-info-container'>
            <Paper className='game-page-info'>
              <GameInfo
                game={game}
                currentUserId={currentUser.id}
                isButtonsDisabled={isButtonsDisabled}
                closeGame={closeGame}
                leaveGame={leaveGame}
                readyToGame={readyToGame}
                startGame={startGame}
                removeGame={removeGame}
                repeatGame={repeatGame}
                updateOption={updateOption}
              />
            </Paper>
          </div>

          <div className='game-page-chat-container'>
            <Paper className='game-page-chat'>
              <Chat
                logs={game.logs}
                gameId={game.id}
                sendMessage={sendMessage}
              />
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
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeGame: bindActionCreators(closeGameWithoutDispatch, dispatch),
  leaveGame: bindActionCreators(leaveGameWithoutDispatch, dispatch),
  readyToGame: bindActionCreators(readyToGameWithoutDispatch, dispatch),
  startGame: bindActionCreators(startGameWithoutDispatch, dispatch),
  sendMessage: bindActionCreators(sendMessageWithoutDispatch, dispatch),
  makeMove: bindActionCreators(makeMoveWithoutDispatch, dispatch),
  removeGame: bindActionCreators(removeGameWithoutDispatch, dispatch),
  repeatGame: bindActionCreators(repeatGameWithoutDispatch, dispatch),
  updateOption: bindActionCreators(updateOptionWithoutDispatch, dispatch),
});

export const GamePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamePagePure);
