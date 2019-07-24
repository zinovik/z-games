import React, { Fragment } from 'react';
import { object, func } from 'prop-types';
import { Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import { gamesNames } from '../../../services';
import { initialState } from '../../../reducers/games';

import { IFilterSettings, IUser } from '../../../interfaces';

import './index.scss';

export function GamesFilter({
  filterSettings,
  currentUser,
  reloadGames,
}: {
  filterSettings: IFilterSettings;
  currentUser?: IUser;
  reloadGames: (filterSettings: IFilterSettings) => void;
}) {
  const { isNotStarted, isStarted, isFinished, isWithMe, isWithoutMe, isMyMove, isNotMyMove, isGames } = filterSettings;

  const {
    filterSettings: { limit },
  } = initialState;

  const handleNotStarted = (): void => {
    reloadGames({ ...filterSettings, isNotStarted: !isNotStarted, limit });
  };

  const handleStarted = (): void => {
    reloadGames({ ...filterSettings, isStarted: !isStarted, limit });
  };

  const handleFinished = (): void => {
    reloadGames({ ...filterSettings, isFinished: !isFinished, limit });
  };

  const handleWithoutMe = (): void => {
    reloadGames({ ...filterSettings, isWithoutMe: !isWithoutMe, limit });
  };

  const handleWithMe = (): void => {
    reloadGames({ ...filterSettings, isWithMe: !isWithMe, limit });
  };

  const handleNotMyMove = (): void => {
    reloadGames({ ...filterSettings, isNotMyMove: !isNotMyMove, limit });
  };

  const handleMyMove = (): void => {
    reloadGames({ ...filterSettings, isMyMove: !isMyMove, limit });
  };

  const handleIsGame = (gameName: string) => {
    reloadGames({
      ...filterSettings,
      isGames: {
        ...isGames,
        [gameName]: !isGames[gameName],
      },
      limit,
    });
  };

  return (
    <div className="games-filter-container">
      <Typography>
        <FormControlLabel control={<Checkbox checked={isNotStarted} onChange={handleNotStarted} />} label="Not Started" />
        <FormControlLabel control={<Checkbox checked={isStarted} onChange={handleStarted} />} label="Started" />
        <FormControlLabel control={<Checkbox checked={isFinished} onChange={handleFinished} />} label="Finished" />
      </Typography>

      {currentUser && (
        <Fragment>
          <Typography>
            <FormControlLabel control={<Checkbox checked={isWithoutMe} onChange={handleWithoutMe} />} label="Without Me" />
            <FormControlLabel control={<Checkbox checked={isWithMe} onChange={handleWithMe} />} label="With Me" />
          </Typography>

          <Typography>
            <FormControlLabel control={<Checkbox checked={isNotMyMove} onChange={handleNotMyMove} />} label="Not My Move" />
            <FormControlLabel control={<Checkbox checked={isMyMove} onChange={handleMyMove} />} label="My Move" />
          </Typography>
        </Fragment>
      )}

      <Typography>
        {gamesNames.map(gameName => (
          <FormControlLabel
            control={
              <Checkbox
                checked={isGames[gameName]}
                onChange={() => {
                  handleIsGame(gameName);
                }}
              />
            }
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
  reloadGames: func.isRequired,
};

GamesFilter.defaultProps = {
  filterSettings: {},
  reloadGames: () => null,
};
