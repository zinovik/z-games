import * as React from 'react';
import { connect } from "react-redux";

import { Authorization } from '../';
import { GamesList } from '../';
import { UsersOnline, NewGame } from '../../components';
import { ZGamesApi } from '../../services';
import * as types from '../../constants';

interface HomePageProps extends React.Props<{}> {
  currentUser: types.User,
  connected: boolean,
  allGames: types.Game[],
  usersOnline: types.User[],
}

class HomePage extends React.Component<HomePageProps, {}> {
  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  render() {
    return (
      <div>
        {this.props.connected && <div>connected</div>}
        <UsersOnline usersOnline={this.props.usersOnline} />
        <Authorization
          currentUsername={this.props.currentUser && this.props.currentUser.username}
          signUp={this.zGamesApi.register}
          signIn={this.zGamesApi.login}
          logOut={this.zGamesApi.logout}
        />
        {this.props.currentUser && <NewGame newGame={this.zGamesApi.newGame} />}
        <GamesList
          allGames={this.props.allGames}
          currentUsername={this.props.currentUser && this.props.currentUser.username}
          joinGame={this.zGamesApi.joinGame}
          openGame={this.zGamesApi.openGame}
          watchGame={this.zGamesApi.watchGame}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: { users: types.UsersState, games: types.GamesState }) => {
  return {
    usersOnline: state.users.usersOnline,
    connected: state.users.connected,
    currentUser: state.users.currentUser,
    allGames: state.games.allGames,
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
