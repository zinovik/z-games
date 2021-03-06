import moment from 'moment';
import React, { Fragment, useState } from 'react';
import { object } from 'prop-types';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';

import { GameRules } from '../../game-rules';
import { GamesServices } from '../../../services';
import { IInvite } from '../../../interfaces';

import './index.scss';

export function InviteInviter({ invite }: { invite: IInvite }) {
  const [isRulesShown, setIsRulesShown] = useState(false);

  const handleRulesClose = () => {
    setIsRulesShown(false);
  };

  const handleLogoClick = () => {
    setIsRulesShown(true);
  };

  return (
    <Fragment>
      <Card className="invite-inviter-card">
        <CardHeader
          title={`#${invite.game.number}: ${invite.game.name}`}
          subheader={moment(invite.createdAt).fromNow()}
        />

        {!invite.isClosed && (
          <div className="game-img-container">
            <img
              src={`/images/${GamesServices[invite.game.name].getNameWork()}.png`}
              className="game-img"
              onClick={handleLogoClick}
              title={`click to see ${invite.game.name} game rules`}
              alt="game logo"
            />
          </div>
        )}

        <CardContent>
          <Typography>{`${invite.invitee && invite.invitee.username} was invited`}</Typography>

          <Typography
            className={
              invite.isClosed
                ? invite.isAccepted
                  ? 'invite-inviter-accepted'
                  : invite.isDeclined
                  ? 'invite-inviter-declined'
                  : ''
                : 'invite-inviter-pending'
            }
          >
            {invite.isClosed
              ? invite.isAccepted
                ? 'accepted'
                : invite.isDeclined
                ? 'declined'
                : 'expired'
              : 'pending'}
          </Typography>
        </CardContent>
      </Card>

      {isRulesShown && <GameRules gameName={invite.game.name} close={handleRulesClose} />}
    </Fragment>
  );
}

InviteInviter.propTypes = {
  invite: object.isRequired,
};

InviteInviter.defaultProps = {
  invite: {},
};
