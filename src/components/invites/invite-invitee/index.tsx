import moment from 'moment';
import React, { Fragment, useState } from 'react';
import { object, func } from 'prop-types';
import { Card, CardHeader, CardContent, Typography, IconButton, CardActions } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';

import { GameRules } from '../../game-rules';
import { GamesServices } from '../../../services';
import { IInvite } from '../../../interfaces';

import './index.scss';

export function InviteInvitee({ invite, acceptInvite, declineInvite }: {
  invite: IInvite;
  acceptInvite: (inviteId: string) => void;
  declineInvite: (inviteId: string) => void;
}) {

  const [isRulesShown, setIsRulesShown] = useState(false);

  const handleRulesClose = () => {
    setIsRulesShown(false);
  };

  const handleLogoClick = () => {
    setIsRulesShown(true);
  };

  const handleAcceptClick = () => {
    acceptInvite(invite.id);
  };

  const handleDeclineClick = () => {
    declineInvite(invite.id);
  };

  return (
    <Fragment>
      <Card className='invite-invitee-card'>
        <CardHeader
          title={`#${invite.game.number}: ${invite.game.name}`}
          subheader={moment(invite.createdAt).fromNow()}
        />

        <div className='game-img-container'>
          <img
            src={`/images/${GamesServices[invite.game.name].getNameWork()}.png`}
            className='game-img'
            onClick={handleLogoClick}
            title={`click to see ${invite.game.name} game rules`}
            alt='game-logo'
          />
        </div>

        <CardContent>

          <Typography>
            {`invite by ${invite.createdBy && invite.createdBy.username}`}
          </Typography>

          {invite.isClosed && (
            <Typography className={invite.isAccepted ? 'invite-invitee-accepted' : invite.isDeclined ? 'invite-invitee-declined' : ''}>
              {invite.isAccepted ? 'accepted' : invite.isDeclined ? 'declined' : 'expired'}
            </Typography>
          )}

        </CardContent>

        <CardActions>

          <IconButton onClick={handleAcceptClick} disabled={invite.isClosed} title='Click to accept the invite' >
            <Check />
          </IconButton>

          <IconButton onClick={handleDeclineClick} disabled={invite.isClosed} title='Click to decline the invite' >
            <Close />
          </IconButton>

        </CardActions>

      </Card>

      {isRulesShown && <GameRules gameName={invite.game.name} close={handleRulesClose} />}
    </Fragment>
  );
}

InviteInvitee.propTypes = {
  invite: object.isRequired,
  acceptInvite: func.isRequired,
  declineInvite: func.isRequired,
};

InviteInvitee.defaultProps = {
  invite: {},
  acceptInvite: () => null,
  declineInvite: () => null,
};
