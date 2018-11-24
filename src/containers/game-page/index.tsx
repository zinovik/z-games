import * as React from 'react';
import { connect } from 'react-redux';

import { NoThanks, Perudo } from '..';
// import { NoThanks, Perudo, Chat } from '..';
import { GameInfo } from '../../components';
// import { GameInfo, GameResults } from '../../components';
import { ZGamesApi } from '../../services';
import * as types from '../../constants';

interface GamePageProps extends React.Props<{}> {
  currentUsername: string,
  connected: boolean,
  game: types.Game,
  usersOnline: types.User[],
  match: { params: { number: string } },
}

class GamePage extends React.Component<GamePageProps, {}> {
  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  render() {
    const { currentUsername, game } = this.props;

    return (
      <div>

        {this.props.connected && <div>connected</div>}

        {this.props.match.params.number}

        {game && game.gameData && <div>
          <React.Fragment>
            <GameInfo
              game={game}
              leave={() => { this.zGamesApi.leaveGame(game.number); }}
              close={() => { this.zGamesApi.closeGame(game.number); }}
              ready={this.zGamesApi.readyToGame}
              start={this.zGamesApi.startGame}
            />
          </React.Fragment>

          <React.Fragment>
            {game.state === 1 && <div>
              {game.name === types.NO_THANKS && <NoThanks game={game} currentUsername={currentUsername} move={this.zGamesApi.move} />}
              {game.name === types.PERUDO && <Perudo game={game} currentUsername={currentUsername} move={this.zGamesApi.move} />}
            </div>}
            {/* {game.state === 2 && <GameResults game={game.name} players={game.players} playersInGame={game.players || []} />} */}
          </React.Fragment>

          <React.Fragment>
            {/* {game.logNchat && <Chat messages={game.logNchat} newMessage={this.zGamesApi.message} />} */}
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
    currentUsername: state.users.currentUser && state.users.currentUser.email,
    game: state.games.openGame,
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamePage);
