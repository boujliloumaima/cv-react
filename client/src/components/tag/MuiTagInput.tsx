import React, { useState, useRef } from 'react';
import { Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

const MuiTagInput = ({ control, name, placeholder }: { control: any; name:string; placeholder: string}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field: { onChange, value = [] } }) => {
        const currentValue = Array.isArray(value) ? value : [];

        const handleKeyDown = (e: React.KeyboardEvent) => {
          // Add tag on Enter, Tab, or Comma
          if (
            (e.key === 'Enter' || e.key === 'Tab' || e.key === ',') &&
            inputValue.trim() !== ''
          ) {
            e.preventDefault();
            const newValue = [...currentValue, inputValue.trim()];
            onChange(newValue);
            setInputValue('');
          }
        };

        return (
          <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={currentValue}
            inputValue={inputValue}
            onChange={(event, newValue: string[]) => {
              onChange(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderValue={(value: readonly string[], getTagProps) =>
              value.map((option: string, idx: number) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index: idx })}
                  key={idx}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder={placeholder}
                fullWidth
                inputRef={inputRef}
                onKeyDown={handleKeyDown}
              />
            )}
          />
        );
      }}
    />
  );
};

export default MuiTagInput;
