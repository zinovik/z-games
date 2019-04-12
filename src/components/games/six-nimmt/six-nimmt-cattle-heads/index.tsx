import React from 'react';
import { number } from 'prop-types';
import { Typography } from '@material-ui/core';

import './index.scss';

const CATTLE_HEAD: string = '+';

export function SixNimmtCattleHeads({ cattleHeads }: { cattleHeads: number }) {
  return (
    <Typography className='six-nimmt-cattle-heads'>
      {Array(cattleHeads).fill(0).map((cattleHead, index) =>
        <span className='six-nimmt-cattle-head' key={index}>{CATTLE_HEAD}</span>
      )}
    </Typography>
  );
}

SixNimmtCattleHeads.propTypes = {
  cattleHeads: number.isRequired,
};

SixNimmtCattleHeads.defaultProps = {
  cattleHeads: 0,
};
