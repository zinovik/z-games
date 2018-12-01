import * as React from 'react';
import * as PropTypes from 'prop-types';

const CHIP: string = '\u2B24';

export const NoThanksChips = ({ chips }: { chips: number }) => {
  return (
    <span>
      {Array(chips + 1).join(CHIP)} ({chips})
    </span>
  );
};

NoThanksChips.propTypes = {
  chips: PropTypes.number.isRequired,
}
