import React, { Fragment } from 'react';
import { object } from 'prop-types';
// import { Card, CardHeader, CardContent, Typography, IconButton, CardActions } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import { IInvite } from '../../../interfaces';

export function InviteInviter({ invite }: { invite: IInvite }) {
  return (
    <Fragment>
      <Typography>
        {invite.game.number}: {invite.createdBy.username}
      </Typography>
    </Fragment>
  );
}

InviteInviter.propTypes = {
  invite: object.isRequired,
};

InviteInviter.defaultProps = {
  invite: {},
};
