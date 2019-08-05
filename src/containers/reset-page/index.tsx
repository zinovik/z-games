import React, { ComponentType, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { Loading } from '../../components/loading';
import { activate as activateWithoutDispatch } from '../../actions';
import { IState } from '../../interfaces';

function ResetPagePure({
  match: {
    params: { token },
  },
  serverUrl,
  activate,
}: {
  match: { params: { token: string } };
  serverUrl: string;
  activate: (serverUrl: string, token: string) => Promise<void>;
}) {
  const [isActivating, setIsActivating] = useState(false);

  if (!isActivating) {
    activate(serverUrl, token);
    setIsActivating(true);
  }

  return <Loading />;
}

const mapStateToProps = (state: IState) => ({
  serverUrl: state.users.serverUrl,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  activate: bindActionCreators(activateWithoutDispatch, dispatch),
});

export const ResetPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPagePure as ComponentType<any>);
