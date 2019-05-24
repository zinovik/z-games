import React, { ChangeEvent } from 'react';
import { object, bool } from 'prop-types';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import { GamesServices } from '../../../services';
import { IGame, GameDataType } from '../../../interfaces';

import './index.scss';

export function GameOptions({ game, isButtonsDisabled, updateOption }: {
  game: IGame;
  isButtonsDisabled: boolean;
  updateOption: (parameters: { gameId: string, name: string, value: string }) => void;
}) {
  const { gameData } = game;
  const { options }: GameDataType = JSON.parse(gameData);

  const optionsVariants = GamesServices[game.name].getOptionsVariants();

  const handleOptionChange = ({ name, value }: { name: string, value: string }) => {
    updateOption({
      gameId: game.id,
      name,
      value,
    });
  };

  return (
    <div className='game-options-container'>
      {optionsVariants.map(option => (
        <FormControl key={`game-option-${option.name}`}>
          <InputLabel>{option.name}</InputLabel>
          <Select
            value={options.find(currentOption => currentOption.name === option.name)!.value}
            onChange={(event: ChangeEvent<any>) => { handleOptionChange({ name: option.name, value: event.target.value }); }}
            disabled={isButtonsDisabled}
          >
            {option.values.map(value => (
              <MenuItem value={value} key={`game-option-value-${value}`}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}

    </div>
  );
}

GameOptions.propTypes = {
  game: object.isRequired,
  isButtonsDisabled: bool.isRequired,
};

GameOptions.defaultProps = {
  updateOption: () => null,
};
