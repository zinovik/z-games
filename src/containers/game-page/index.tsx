import * as React from 'react';
import { connect } from 'react-redux';

import { NoThanks, Perudo, Chat } from '..';
import { GameInfo, GameResults } from '../../components';
import { ZGamesApi } from '../../services';
import * as types from '../../constants';

interface GamePageProps extends React.Props<{}> {
  currentUsername: string,
  connected: boolean,
  game: types.Game,
  usersOnline: types.UserOnline[],
  match: { params: { id: string } },
}

class GamePage extends React.Component<GamePageProps, {}> {
  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  render() {
    const { currentUsername, game } = this.props;

    return (
      <div>

        {this.props.connected && <div>connected</div>}

        {this.props.match.params.id}

        {game && game.gameInfo && <div>
          <React.Fragment>
            <GameInfo
              game={game}
              leave={this.zGamesApi.leaveGame}
              ready={this.zGamesApi.readyToGame}
              start={this.zGamesApi.startGame}
            />
          </React.Fragment>

          <React.Fragment>
            {game.gameInfo.started && !game.gameInfo.finished && <div>
              {game.name === types.NO_THANKS && <NoThanks game={game} currentUsername={currentUsername} move={this.zGamesApi.move} />}
              {game.name === types.PERUDO && <Perudo game={game} currentUsername={currentUsername} move={this.zGamesApi.move} />}
            </div>}
            {game.gameInfo.finished && <GameResults game={game.name} players={game.players} playersInGame={game.gameInfo.players || []} />}
          </React.Fragment>

          <React.Fragment>
            {game.logNchat && <Chat messages={game.logNchat} newMessage={this.zGamesApi.message} />}
          </React.Fragment>
        </div>}

      </div>
    );
  }
}

const mapStateToProps = (state: { users: types.UsersState, games: types.GamesState }) => {
  return {
    usersOnline: state.users.usersOnline,
    connected: state.users.connected,
    currentUsername: state.users.currentUsername,
    game: state.games.openGame,
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamePage);
