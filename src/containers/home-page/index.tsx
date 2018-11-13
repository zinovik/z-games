import * as React from 'react';
import { connect } from "react-redux";

import { Authorization } from '../';
import { GamesList } from '../';
import { UsersOnline, NewGame } from '../../components';
import { ZGamesApi } from '../../services';
import * as types from '../../constants';

interface HomePageProps extends React.Props<{}> {
  currentUsername: string,
  connected: boolean,
  allGames: types.Game[],
  usersOnline: types.UserOnline[],
}

class HomePage extends React.Component<HomePageProps, {}> {
  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  render() {
    return (
      <div>
        {this.props.connected && <div>connected</div>}
        <UsersOnline usersOnline={this.props.usersOnline} />
        <Authorization
          currentUsername={this.props.currentUsername}
          signUp={this.zGamesApi.register}
          signIn={this.zGamesApi.login}
          logOut={this.zGamesApi.logout}
        />
        {this.props.currentUsername && <NewGame newGame={this.zGamesApi.newGame} />}
        <GamesList
          allGames={this.props.allGames}
          currentUsername={this.props.currentUsername}
          joinGame={this.zGamesApi.joinGame}
        />
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
  mapDispatchToProps,
)(HomePage);
