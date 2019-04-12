import React, { Fragment } from 'react';
import { object, func } from 'prop-types';
import { Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import { gamesNames } from '../../../services';

import { IFilterSettings, IUser } from '../../../interfaces';

import './index.scss';

export function GamesFilter({ filterSettings, currentUser, updateFilterSettings }: {
  filterSettings: IFilterSettings,
  currentUser?: IUser,
  updateFilterSettings: (filterSettings: IFilterSettings) => void,
}) {
  const { isNotStarted, isStarted, isFinished, isWithMe, isWithoutMe, isMyMove, isNotMyMove, isGames } = filterSettings;

  const handleNotStarted = (): void => {
    updateFilterSettings({
      ...filterSettings,
      isNotStarted: !isNotStarted,
    });
  };

  const handleStarted = (): void => {
    updateFilterSettings({
      ...filterSettings,
      isStarted: !isStarted,
    });
  };

  const handleFinished = (): void => {
    updateFilterSettings({
      ...filterSettings,
      isFinished: !isFinished,
    });
  };

  const handleWithoutMe = (): void => {
    updateFilterSettings({
      ...filterSettings,
      isWithoutMe: !isWithoutMe,
    });
  };

  const handleWithMe = (): void => {
    updateFilterSettings({
      ...filterSettings,
      isWithMe: !isWithMe,
    });
  };

  const handleNotMyMove = (): void => {
    updateFilterSettings({
      ...filterSettings,
      isNotMyMove: !isNotMyMove,
    });
  };

  const handleMyMove = (): void => {
    updateFilterSettings({
      ...filterSettings,
      isMyMove: !isMyMove,
    });
  };

  const handleIsGame = (gameName: string) => {
    updateFilterSettings({
      ...filterSettings,
      isGames: {
        ...isGames,
        [gameName]: !isGames[gameName]
      },
    });
  };

  return (
    <div className='games-filter-container'>
      <Typography>
        <FormControlLabel control={<Checkbox checked={isNotStarted} onChange={handleNotStarted} />} label='Not Started' />
        <FormControlLabel control={<Checkbox checked={isStarted} onChange={handleStarted} />} label='Started' />
        <FormControlLabel control={<Checkbox checked={isFinished} onChange={handleFinished} />} label='Finished' />
      </Typography>

      {currentUser && <Fragment>
        <Typography>
          <FormControlLabel control={<Checkbox checked={isWithoutMe} onChange={handleWithoutMe} />} label='Without Me' />
          <FormControlLabel control={<Checkbox checked={isWithMe} onChange={handleWithMe} />} label='With Me' />
          </Typography>

        <Typography>
          <FormControlLabel control={<Checkbox checked={isNotMyMove} onChange={handleNotMyMove} />} label='Not My Move' />
          <FormControlLabel control={<Checkbox checked={isMyMove} onChange={handleMyMove} />} label='My Move' />
          </Typography>
      </Fragment>}

      <Typography>
        {gamesNames.map(gameName => (
          <FormControlLabel control={<Checkbox
            checked={isGames[gameName]}
            onChange={() => { handleIsGame(gameName); }} />}
            label={gameName}
            key={`game-name-filter-${gameName}`}
          />
        ))}
      </Typography>
    </div>
  );
}

GamesFilter.propTypes = {
  filterSettings: object.isRequired,
  currentUser: object,
  updateFilterSettings: func.isRequired,
};

GamesFilter.defaultProps = {
  filterSettings: {},
  updateFilterSettings: () => null,
};
