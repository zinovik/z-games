import * as React from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';

import { NoThanks, Perudo, Chat, Header } from '../../containers';
import { GameInfo, GameResults } from '../../components';
import { ZGamesApi } from '../../services';
import * as types from '../../constants';
import './index.css';

interface GamePageProps extends React.Props<{}> {
  currentUser: types.User,
  isConnected: boolean,
  game: types.Game,
  usersOnline: types.User[],
  match: { params: { number: string } },
}

class GamePage extends React.Component<GamePageProps, {}> {
  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  render() {
    const { isConnected, currentUser, game } = this.props;

    if (!currentUser || !game) {
      return null;
    }

    const playersInGame = JSON.parse(game.gameData).players;

    return (
      <div>
        <Header
          isConnected={isConnected}
          currentUsername={currentUser.username}
          signUp={this.zGamesApi.register}
          signIn={this.zGamesApi.login}
          logOut={this.zGamesApi.logout}
        />

        <div>
          <div className='game-info-container'>
            <React.Fragment>
              <GameInfo
                game={game}
                currentUserId={currentUser.id}
                leave={() => { this.zGamesApi.leaveGame(game.number); }}
                close={() => { this.zGamesApi.closeGame(game.number); }}
                ready={() => { this.zGamesApi.readyToGame(game.number); }}
                start={() => { this.zGamesApi.startGame(game.number); }}
              />
            </React.Fragment>
          </div>

          <div className='game-and-log-container'>
            <Paper>
              {game.state === types.GAME_STARTED && <div>
                {game.name === types.NO_THANKS && <NoThanks game={game} currentUser={currentUser} move={this.zGamesApi.makeMove} />}
                {game.name === types.PERUDO && <Perudo game={game} currentUser={currentUser} move={this.zGamesApi.makeMove} />}
              </div>}
              {game.state === types.GAME_FINISHED && <GameResults gameName={game.name} players={game.players} playersInGame={playersInGame || []} />}
            </Paper>

            <React.Fragment>
              {game.logs && <Chat logs={game.logs} newMessage={this.zGamesApi.message} />}
            </React.Fragment>
          </div>
        </div>

      </div>
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
