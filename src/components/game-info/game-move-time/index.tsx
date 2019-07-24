import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { string, number } from 'prop-types';
import { Typography } from '@material-ui/core';

import './index.scss';

export function GameMoveTime({ previousMoveAt, maxTime }: { previousMoveAt: string; maxTime: number }) {
  const [now, setNow] = useState(moment(new Date()));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(moment(new Date()));
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const end = moment(previousMoveAt).add(maxTime);
  const duration = moment.utc(end.diff(now)).format('HH:mm:ss');

  return <Typography className="game-move-time">{now > end ? 'Move timeout!' : `Move ends in ${duration}`}</Typography>;
}

GameMoveTime.propTypes = {
  previousMoveAt: string.isRequired,
  maxTime: number.isRequired,
};

GameMoveTime.defaultProps = {
  previousMoveAt: 0,
  maxTime: 0,
};
