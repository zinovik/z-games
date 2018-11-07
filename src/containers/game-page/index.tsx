import * as React from 'react';
import { connect } from "react-redux";

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
    console.log(this.props);
    return (
      <div>
        {this.props.connected && <div>connected</div>}
        {this.props.match.params.id}
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
