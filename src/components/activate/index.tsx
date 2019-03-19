import React from 'react';
import { Typography } from '@material-ui/core';

import { ZGamesApi } from '../../services';

const zGamesApi: ZGamesApi = ZGamesApi.Instance;

export function Activate({ match: { params: { token: activationToken } } }: { match: { params: { token: string } } }) {

  zGamesApi.activate(activationToken);

  return (
    <Typography>
      Activation...
    </Typography>
  );
}
