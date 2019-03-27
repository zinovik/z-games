import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';

import { Loading } from '../';
import { activate as activateWithoutDispatch } from '../../actions';

function ActivatePure({ match: { params: { token } }, activate }: {
  match: { params: { token: string } },
  activate: (token: string) => Promise<void>,
}) {
  activate(token);

  return <Loading />;
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  activate: bindActionCreators(activateWithoutDispatch, dispatch),
});

export const Activate = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActivatePure as ComponentType<any>) as ComponentType<any>)
