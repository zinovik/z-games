import React, { Component, Props, Fragment, ComponentType } from 'react'
import { any } from 'prop-types'
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import {
  updateStatus,
  updateCurrentUser,
  updateUsersOnline,
  updateAllGames,
  updateOpenGame,
  addNewGame,
  updateGame,
  addNewLog,
} from '../../actions';
// import { IGame, IUser, IUsersOnline, ILog } from '../../interfaces';

interface ISocketActionsProps extends Props<{}> {
  children: any,
}

class SocketActionsPure extends Component<ISocketActionsProps, {}> {

  static propTypes = {
    children: any,
  };

  constructor(props: ISocketActionsProps) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateStatus: bindActionCreators(updateStatus, dispatch),
  updateCurrentUser: bindActionCreators(updateCurrentUser, dispatch),
  updateUsersOnline: bindActionCreators(updateUsersOnline, dispatch),
  updateAllGames: bindActionCreators(updateAllGames, dispatch),
  updateOpenGame: bindActionCreators(updateOpenGame, dispatch),
  addNewGame: bindActionCreators(addNewGame, dispatch),
  updateGame: bindActionCreators(updateGame, dispatch),
  addNewLog: bindActionCreators(addNewLog, dispatch),
});

export const SocketActions = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SocketActionsPure as ComponentType<any>);
