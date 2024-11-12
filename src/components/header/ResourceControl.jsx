import React from 'react';
import {
  Box,
  Text,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

const ResourceControl = ({ label, current, max, onChange }) => {
  return (
    <Box>
      <Text>{label}</Text>
      <HStack>
        <NumberInput
          value={current}
          min={0}
          max={max}
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
        <Text>/</Text>
        <Text>{max}</Text>
      </HStack>
    </Box>
  );
};

export default ResourceControl;