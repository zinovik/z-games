import React, { Fragment, MouseEvent, useState } from 'react';
import { object } from 'prop-types';
import { Popover, Typography } from '@material-ui/core';

import { IUsersOnline } from '../../interfaces';

import './index.scss';

export function UsersOnline({ usersOnline }: { usersOnline: IUsersOnline }) {
  const [anchorEl, setAnchorEl] = useState(null as HTMLElement | null);

  const handleShow = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHide = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Typography
        variant='h6'
        aria-owns={open ? 'users-popper' : undefined}
        aria-haspopup='true'
        onMouseEnter={handleShow}
        onMouseLeave={handleHide}
      >
        {usersOnline.users ? usersOnline.users.length : 0} / {usersOnline.usersCount ? usersOnline.usersCount : 0}
      </Typography>

      <Popover
        id='users-popper'
        className='users-online-popper'
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleHide}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableRestoreFocus={true}
      >
        {usersOnline.users.map((user, index) => (
          <Typography key={index}>
            {user.username}
          </Typography>)
        )}
      </Popover>

    </Fragment>
  );
}

UsersOnline.propTypes = {
  usersOnline: object.isRequired,
}

UsersOnline.defaultProps = {
  usersOnline: [],
}
