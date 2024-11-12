import React from 'react';
import {
  Box,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import SpellSearchBar from './SpellSearchBar';
import SpellList from './SpellList';
import SpellDetailModal from './SpellDetailModal';

const ArcanaSection = ({ character, onCharacterUpdate }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');

  const handleLearnSpell = (spell) => {
    if (!character.spells.find(s => s.id === spell.id)) {
      onCharacterUpdate({
        ...character,
        spells: [...character.spells, spell]
      });
    }
  };

  const handleForgetSpell = (spellId) => {
    onCharacterUpdate({
      ...character,
      spells: character.spells.filter(spell => spell.id !== spellId)
    });
  };

  return (
    <Box p={4} bg={bgColor} borderRadius="lg" borderWidth="1px">
      <VStack spacing={4} align="stretch">
        <SpellSearchBar 
          character={character} 
          onLearnSpell={handleLearnSpell}
        />
        <SpellList
          character={character}
          onForgetSpell={handleForgetSpell}
        />
      </VStack>
    </Box>
  );
};

export default ArcanaSection;

