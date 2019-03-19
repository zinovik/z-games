import React, { Fragment, MouseEvent, useState } from 'react';
import { array } from 'prop-types';
import { Popover, Typography } from '@material-ui/core';

import * as types from '../../constants';
import './index.scss';

export function UsersOnline({ usersOnline }: { usersOnline: types.IUser[] }) {
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
        {usersOnline ? usersOnline.length : 0}
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
        {usersOnline.map((user, index) => (
          <Typography key={index}>
            {user.username}
          </Typography>)
        )}
      </Popover>

    </Fragment>
  );
}

UsersOnline.propTypes = {
  usersOnline: array.isRequired,
}

UsersOnline.defaultProps = {
  usersOnline: [],
}
