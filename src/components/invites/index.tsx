import React, { Fragment } from 'react';
import { object, bool, func } from 'prop-types';
import { Typography } from '@material-ui/core';

import { InviteInvitee } from './invite-invitee';
import { InviteInviter } from './invite-inviter';
import { IUser } from '../../interfaces';

export function Invites({
  currentUser,
  isButtonsDisabled,
  acceptInvite,
  declineInvite,
}: {
  currentUser: IUser,
  isButtonsDisabled: boolean,
  acceptInvite: (inviteId: string) => void,
  declineInvite: (inviteId: string) => void,
}) {
  const { invitesInvitee, invitesInviter } = currentUser;

  return (
    <Fragment>

      {invitesInvitee.length > 0 && <Fragment>
        <Typography>
          My invites (I am invitee):
        </Typography>

        {invitesInvitee.map(invite => (
          <InviteInvitee key={invite.id}
            invite={invite}
          />
        ))}
      </Fragment>}

      {invitesInviter.length > 0 && <Fragment>
        <Typography>
          My invites (created by me):
        </Typography>

        {invitesInviter.map(invite => (
          <InviteInviter key={invite.id}
            invite={invite}
          />
        ))}
      </Fragment>}

    </Fragment>
  );
}

Invites.propTypes = {
  currentUser: object.isRequired,
  isButtonsDisabled: bool.isRequired,
  acceptInvite: func.isRequired,
  declineInvite: func.isRequired,
};

Invites.defaultProps = {
  invites: [],
  isButtonsDisabled: [],
  acceptInvite: () => null,
  declineInvite: () => null,
};
