import * as React from 'react';
import { connect } from "react-redux";

import { Header } from '../../containers';
import { NewGame } from '../../components';
import { ZGamesApi } from '../../services';
import * as types from '../../constants';

interface HomePageProps extends React.Props<{}> {
  currentUser: types.User,
  isConnected: boolean,
  allGames: types.Game[],
  usersOnline: types.User[],
}

class HomePage extends React.Component<HomePageProps, {}> {
  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  render() {
    return (
      <div>
        <Header
          isConnected={this.props.isConnected}
          currentUsername={this.props.currentUser && this.props.currentUser.username}
          signUp={this.zGamesApi.register}
          signIn={this.zGamesApi.login}
          logOut={this.zGamesApi.logout}
        />
        {this.props.currentUser && <NewGame newGame={this.zGamesApi.newGame} />}
      </div>
    );
  }
}

const mapStateToProps = (state: { users: types.UsersState, games: types.GamesState }) => {
  return {
    usersOnline: state.users.usersOnline,
    connected: state.users.isConnected,
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
