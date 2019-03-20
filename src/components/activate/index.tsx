import React from 'react';

import { Loading } from '../';
import { ZGamesApi, activate } from '../../services';

const zGamesApi = ZGamesApi.Instance;

export function Activate({ match: { params: { token: activationToken } } }: { match: { params: { token: string } } }) {

  const activation = async () => {
    try {
      const { token }: { token: string } = await activate(activationToken);
      zGamesApi.setToken(token);
      alert('User has been successfully activated!');
    } catch (error) {
      alert(error.message);
    } finally {
      zGamesApi.updateRoute();
    }
  };
  activation();

  return <Loading />;
}
