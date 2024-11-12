import React from 'react';
import {
  VStack,
  Text,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import VitalAttribute from './VitalAttribute';

const VitalsTab = ({ character, onCharacterUpdate }) => {
  const handleVitalChange = (vital, newValue) => {
    const updatedAttributes = {
      ...character.attributes,
      [vital]: newValue
    };
    onCharacterUpdate({
      ...character,
      attributes: updatedAttributes
    });
  };

  const vitalsData = [
    {
      name: 'Strength',
      key: 'strength',
      description: 'Physical power and carrying capacity'
    },
    {
      name: 'Dexterity',
      key: 'dexterity',
      description: 'Agility, reflexes, and balance'
    },
    {
      name: 'Stamina',
      key: 'stamina',
      description: 'Physical resilience and endurance'
    },
    {
      name: 'Intelligence',
      key: 'intelligence',
      description: 'Mental acuity and knowledge'
    },
    {
      name: 'Perception',
      key: 'perception',
      description: 'Awareness and intuition'
    },
    {
      name: 'Wit',
      key: 'wit',
      description: 'Mental speed and reaction'
    },
    {
      name: 'Charisma',
      key: 'charisma',
      description: 'Force of personality and leadership'
    },
    {
      name: 'Manipulation',
      key: 'manipulation',
      description: 'Ability to influence others'
    },
    {
      name: 'Appearance',
      key: 'appearance',
      description: 'Physical attractiveness and presence'
    }
  ];

  return (
    <VStack spacing={4} align="stretch">
      <Box 
        p={3} 
        bg={useColorModeValue('blue.50', 'blue.900')}
        borderRadius="md"
      >
        <Text fontWeight="bold">
          Available Vital Points: {character.availableVitalPoints}
        </Text>
      </Box>

      {vitalsData.map((vital) => (
        <VitalAttribute
          key={vital.key}
          name={vital.name}
          value={character.attributes[vital.key]}
          description={vital.description}
          onIncrement={() => handleVitalChange(
            vital.key,
            character.attributes[vital.key] + 1
          )}
          onDecrement={() => handleVitalChange(
            vital.key,
            character.attributes[vital.key] - 1
          )}
          canIncrement={character.availableVitalPoints > 0}
          canDecrement={character.attributes[vital.key] > 1}
        />
      ))}
    </VStack>
  );
};

export default VitalsTab;

