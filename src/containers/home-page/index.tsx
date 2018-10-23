import * as React from 'react';
import { connect } from "react-redux";

import { Authorization } from '../';
import { register, login, logout } from '../../services';

class HomePage extends React.Component<{ connected: boolean }, {}> {
  render() {
    return (
      <div>
        {this.props.connected && <div>connected</div>}
        <Authorization
          currentUsername={'test'}
          signUp={register}
          signIn={login}
          logOut={logout}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    connected: state.currentUser.connected
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
