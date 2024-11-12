import React, { useState, useEffect } from 'react';
import { Box, VStack, HStack, useColorModeValue } from '@chakra-ui/react';
import CharacterNameInput from './CharacterNameInput';
import RaceSelect from './RaceSelect';
import ClassSelect from './ClassSelect';
import LevelControl from './LevelControl';
import PointsDisplay from './PointsDisplay';
import ResourceControl from './ResourceControl';

const HeaderSection = ({ character, onCharacterUpdate }) => {
  const [races, setRaces] = useState([]);
  const [classes, setClasses] = useState([]);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const racesResponse = await fetch('/races.json');
        const classesResponse = await fetch('/classes.json');
        const racesData = await racesResponse.json();
        const classesData = await classesResponse.json();
        setRaces(racesData);
        setClasses(classesData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  const handleChange = (field, value) => {
    onCharacterUpdate({
      ...character,
      [field]: value
    });
  };

  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box 
      p={4} 
      bg={bgColor} 
      borderRadius="lg" 
      borderWidth="1px" 
      borderColor={borderColor}
      shadow="md"
    >
      <VStack spacing={4} align="stretch">
        <HStack spacing={4}>
          <CharacterNameInput 
            value={character.name}
            onChange={(value) => handleChange('name', value)}
          />
                  <RaceSelect
                      value={character.race}
                      onChange={(value) => handleChange('race', value)}
                      races={races}
                  />
                  <ClassSelect
                      value={character.class}
                      onChange={(value) => handleChange('class', value)}
                      classes={classes}
                  />
          <LevelControl 
            value={character.level}
            onChange={(value) => handleChange('level', value)}
          />
        </HStack>

        <HStack spacing={4} justify="space-between">
          <PointsDisplay 
            label="Vital Points"
            value={character.availableVitalPoints}
            colorScheme="blue"
          />
          <PointsDisplay 
            label="Skill Points"
            value={character.availableSkillPoints}
            colorScheme="green"
          />
          <PointsDisplay 
            label="Armor Rating"
            value={character.armorRating}
            colorScheme="purple"
          />
        </HStack>

        <HStack spacing={4} justify="space-between">
          <ResourceControl 
            label="Hit Points"
            current={character.hitPoints.current}
            max={character.hitPoints.max}
            onChange={(value) => handleChange('hitPoints', {
              ...character.hitPoints,
              current: value
            })}
          />
          <ResourceControl 
            label="Mana Points"
            current={character.manaPoints.current}
            max={character.manaPoints.max}
            onChange={(value) => handleChange('manaPoints', {
              ...character.manaPoints,
              current: value
            })}
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default HeaderSection;