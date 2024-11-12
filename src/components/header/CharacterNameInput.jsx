import React from 'react';
import { Input } from '@chakra-ui/react';

const CharacterNameInput = ({ value, onChange }) => {
  return (
    <Input
      placeholder="Character Name"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="lg"
      flex={2}
    />
  );
};

export default CharacterNameInput;