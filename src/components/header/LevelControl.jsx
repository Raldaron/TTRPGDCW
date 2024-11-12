import React from 'react';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

const LevelControl = ({ value, onChange }) => {
  return (
    <NumberInput
      value={value}
      min={1}
      max={20}
      onChange={(value) => onChange(parseInt(value))}
      size="md"
      maxW={20}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default LevelControl;