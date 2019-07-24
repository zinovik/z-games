import moment from 'moment';
import React from 'react';
import { object } from 'prop-types';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';

import { User } from '../user';
import { IUser } from '../../interfaces';

import './index.scss';

export function UserProfile({ user }: { user: IUser }) {
  const { avatar, username, email, gamesPlayed, gamesWon, currentGames, createdAt } = user;

  return (
    <div className="user-profile-container">
      <User username={username} avatar={avatar} />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">{email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">Games Won/Played</TableCell>
            <TableCell align="right">
              {gamesWon}/{gamesPlayed}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">Games</TableCell>
            <TableCell align="right">{currentGames.map(game => `${game.name} (${game.number})`).join(', ')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">Registered</TableCell>
            <TableCell align="right">{moment(createdAt).fromNow()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

UserProfile.propTypes = {
  user: object.isRequired,
};

UserProfile.defaultProps = {
  user: {},
};
