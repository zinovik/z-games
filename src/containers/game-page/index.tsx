import * as React from 'react';
import { connect } from 'react-redux';

import { NoThanks, Perudo, Chat } from '..';
import { GameInfo } from '../../components';
import { ZGamesApi } from '../../services';
import * as types from '../../constants';

interface GamePageProps extends React.Props<{}> {
  currentUsername: string,
  connected: boolean,
  allGames: types.Game[],
  usersOnline: types.UserOnline[],
  match: { params: { id: string } },
}

class GamePage extends React.Component<GamePageProps, {}> {
  zGamesApi: ZGamesApi = ZGamesApi.Instance;


  render() {
    const { currentUsername } = this.props;
    const game = this.props.allGames[this.props.match.params.id];

    return (
      <div>
        {this.props.connected && <div>connected</div>}
        {this.props.match.params.id}
        {game &&
          <GameInfo
            game={game}
            leave={this.zGamesApi.leaveGame}
            ready={this.zGamesApi.readyToGame}
            start={this.zGamesApi.startGame}
          />}
        {game && game.name === 'No, Thanks!' && <NoThanks game={game} currentUsername={currentUsername} move={this.zGamesApi.move} />}
        {game && game.name === 'Perudo' && <Perudo game={game} currentUsername={currentUsername} move={this.zGamesApi.move} />}
        {game && game.logNchat && <Chat messages={game.logNchat} newMessage={this.zGamesApi.message} />}
      </div>
    );
  }
}

const mapStateToProps = (state: { users: types.UsersState, games: types.GamesState }) => {
  return {
    usersOnline: state.users.usersOnline,
    connected: state.users.connected,
    currentUsername: state.users.currentUsername,
    allGames: state.games.allGames,
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePage);
