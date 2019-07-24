import React, { Fragment } from 'react';
import { object, func } from 'prop-types';
import { Divider } from '@material-ui/core';

import { InviteInvitee } from './invite-invitee';
import { InviteInviter } from './invite-inviter';
import { IUser } from '../../interfaces';

import './index.scss';

export function Invites({
  currentUser,
  acceptInvite,
  declineInvite,
}: {
  currentUser: IUser;
  acceptInvite: (inviteId: string) => void;
  declineInvite: (inviteId: string) => void;
}) {
  const { invitesInvitee, invitesInviter } = currentUser;

  return (
    <Fragment>
      {invitesInvitee.length > 0 && (
        <div className="invites-invitee-container">
          {invitesInvitee.map(invite => (
            <InviteInvitee key={invite.id} invite={invite} acceptInvite={acceptInvite} declineInvite={declineInvite} />
          ))}
        </div>
      )}

      <Divider variant="middle" />

      {invitesInviter.length > 0 && (
        <div className="invites-inviter-container">
          {invitesInviter.map(invite => (
            <InviteInviter key={invite.id} invite={invite} />
          ))}
        </div>
      )}
    </Fragment>
  );
}

Invites.propTypes = {
  currentUser: object.isRequired,
  acceptInvite: func.isRequired,
  declineInvite: func.isRequired,
};

Invites.defaultProps = {
  invites: [],
  acceptInvite: () => null,
  declineInvite: () => null,
};
