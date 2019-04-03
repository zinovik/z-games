import React, { ComponentType, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { Loading } from '../../components/loading';
import { activate as activateWithoutDispatch } from '../../actions';

function ActivatePagePure({ match: { params: { token } }, activate }: {
  match: { params: { token: string } },
  activate: (token: string) => Promise<void>,
}) {
  const [isActivating, setIsActivating] = useState(false);

  if (!isActivating) {
    activate(token);
    setIsActivating(true);
  }

  return <Loading />;
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  activate: bindActionCreators(activateWithoutDispatch, dispatch),
});

export const ActivatePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActivatePagePure as ComponentType<any>);
