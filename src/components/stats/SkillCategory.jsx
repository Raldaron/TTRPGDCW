import React from 'react';
import {
  VStack,
  Text,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import SkillItem from './SkillItem';

const SkillCategory = ({
  title,
  skills,
  character,
  onSkillChange,
  availablePoints
}) => {
  const headerBgColor = useColorModeValue('gray.100', 'gray.600');

  return (
    <Box>
      <Box p={3} bg={headerBgColor} borderRadius="md" mb={3}>
        <Text fontWeight="bold">{title}</Text>
      </Box>
      <VStack spacing={2} align="stretch">
        {skills.map((skill) => (
          <SkillItem
            key={skill.key}
            name={skill.name}
            value={character.skills[skill.key]}
            description={skill.description}
            associatedAttribute={skill.attribute}
            onIncrement={() => onSkillChange(skill.key)}
            canIncrement={availablePoints > 0}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default SkillCategory;

