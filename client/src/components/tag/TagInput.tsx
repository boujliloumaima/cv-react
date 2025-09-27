import React, { useState, useRef } from "react";
import { Controller } from "react-hook-form";
import { TextInput, Chip, Group, Box } from "@mantine/core";

const TagInput = ({
  control,
  name,
  placeholder,
}: {
  control: any;
  name: string;
  placeholder: string;
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field: { onChange, value = [] } }) => {
        const currentValue = Array.isArray(value) ? value : [];

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (
            (e.key === "Enter" || e.key === "Tab" || e.key === ",") &&
            inputValue.trim() !== ""
          ) {
            e.preventDefault();
            const newValue = [...currentValue, inputValue.trim()];
            onChange(newValue);
            setInputValue("");
          }
        };

        const handleRemove = (idx: number) => {
          const newValue = currentValue.filter((_, i) => i !== idx);
          onChange(newValue);
        };

        return (
          <Box>
            <Group gap={8} mb={8} wrap="wrap">
              {currentValue.map((option: string, idx: number) => (
                <Chip
                  key={idx}
                  checked
                  onChange={() => handleRemove(idx)}
                  color="blue"
                  variant="light"
                  radius="sm"
                  style={{ cursor: "pointer" }}
                >
                  {option}
                </Chip>
              ))}
            </Group>
            <TextInput
              ref={inputRef}
              placeholder={placeholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.currentTarget.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
          </Box>
        );
      }}
    />
  );
};

export default TagInput;
