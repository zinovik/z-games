import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';
import { History } from 'history';

import { Loading } from '../';
import { activate } from '../../actions';

function ActivatePure({ match: { params: { token } }, history, activateUser }: {
  match: { params: { token: string } },
  activateUser: (token: string) => Promise<void>,
  history: History,
}) {

  const activation = async () => {
    try {
      await activateUser(token);

      alert('User has been successfully activated!');
    } catch (error) {
      alert(error.message);
    } finally {
      history.push('/games');
    }
  };
  activation();

  return <Loading />;
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  activateUser: bindActionCreators(activate, dispatch),
});

export const Activate = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActivatePure as ComponentType<any>) as ComponentType<any>)
