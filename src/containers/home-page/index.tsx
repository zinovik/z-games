import * as React from 'react';
import { connect } from "react-redux";

import * as types from '../../constants';
import { Authorization } from '../';
import { ZGamesApi } from '../../services';

interface HomePageProps extends React.Props<{}> {
  currentUsername: string,
  connected: boolean,
}

class HomePage extends React.Component<HomePageProps, {}> {
  zGamesApi: ZGamesApi = ZGamesApi.Instance;

  render() {
    return (
      <div>
        {this.props.connected && <div>connected</div>}
        <Authorization
          currentUsername={this.props.currentUsername}
          signUp={this.zGamesApi.register}
          signIn={this.zGamesApi.login}
          logOut={this.zGamesApi.logout}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: { users: types.UsersState }) => {
  return {
    connected: state.users.connected,
    currentUsername: state.users.currentUsername,
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
