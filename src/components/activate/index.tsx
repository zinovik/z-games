import React, { ComponentType } from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';

import { Loading } from '../';
import { ZGamesApi, activate } from '../../services';

const zGamesApi = ZGamesApi.Instance;

export function ActivateWithoutRouter({ match: { params: { token: activationToken } }, history }: {
  match: { params: { token: string } },
  history: History,
}) {

  const activation = async () => {
    try {
      const { token } = await activate(activationToken);
      zGamesApi.setToken(token);

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

export const Activate = withRouter(ActivateWithoutRouter as ComponentType<any>)
