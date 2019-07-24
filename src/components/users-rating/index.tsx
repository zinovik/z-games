import moment from 'moment';
import React from 'react';
import { array } from 'prop-types';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import { IUser } from '../../interfaces';

import './index.scss';

export function UsersRating({ users }: { users: IUser[] }) {
  return (
    <div className="users-rating-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Games Won/Played</TableCell>
            <TableCell align="right">Registered</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{user.username}</TableCell>
              <TableCell align="right">
                {user.gamesWon} / {user.gamesPlayed}
              </TableCell>
              <TableCell align="right">{moment(user.createdAt).fromNow()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

UsersRating.propTypes = {
  users: array.isRequired,
};

UsersRating.defaultProps = {
  users: [],
};
