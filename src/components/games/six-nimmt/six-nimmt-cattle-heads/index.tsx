import React from 'react';
import { number } from 'prop-types';
import { Typography } from '@material-ui/core';

const CATTLE_HEAD: string = '\u25E6';

export function SixNimmtCattleHeads({ cattleHeads }: { cattleHeads: number }) {
  return (
    <Typography>
      {Array(cattleHeads + 1).join(CATTLE_HEAD)}
    </Typography>
  );
}

SixNimmtCattleHeads.propTypes = {
  cattleHeads: number.isRequired,
};

SixNimmtCattleHeads.defaultProps = {
  cattleHeads: 0,
};
