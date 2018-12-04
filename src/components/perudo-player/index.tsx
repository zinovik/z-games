import React, { Fragment } from 'react';
import { arrayOf, number } from 'prop-types';
import { Typography } from '@material-ui/core';

import { PerudoDices } from '../../components';

PerudoPlayer.propTypes = {
  dices: arrayOf(number),
  dicesCount: number,
}

PerudoPlayer.defaultProps = {
  dices: [],
  dicesCount: 0,
}

export function PerudoPlayer({ dices, dicesCount }: {
  dices?: number[],
  dicesCount?: number,
}) {
  return (
    <Fragment>
      {dices && dices.length > 0 && <PerudoDices dices={dices} />}

      {!dices || !dices.length && <Typography>
        {dicesCount} dices
      </Typography>}
    </Fragment>
  );
}
