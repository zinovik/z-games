import moment from 'moment';
import React from 'react';
import { array } from 'prop-types';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

import * as types from '../../constants';

export function UsersRating({ users }: { users: types.User[] }) {
  return <Table>
    <TableHead>
      <TableRow>
        <TableCell>Position</TableCell>
        <TableCell align='right'>Username</TableCell>
        <TableCell align='right'>First Name</TableCell>
        <TableCell align='right'>Last Name</TableCell>
        <TableCell align='right'>Games Won</TableCell>
        <TableCell align='right'>Games Played</TableCell>
        <TableCell align='right'>Registered</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {users.map((user, index) => (
        <TableRow key={user.id}>
          <TableCell component='th' scope='row'>
            {index + 1}
          </TableCell>
          <TableCell align='right'>{user.username}</TableCell>
          <TableCell align='right'>{user.firstName}</TableCell>
          <TableCell align='right'>{user.lastName}</TableCell>
          <TableCell align='right'>{user.gamesWon}</TableCell>
          <TableCell align='right'>{user.gamesPlayed}</TableCell>
          <TableCell align='right'>{moment(user.createdAt).fromNow()}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>;
}

UsersRating.propTypes = {
  users: array.isRequired,
}

UsersRating.defaultProps = {
  users: [],
}
