import React, { useState } from 'react';
import {
  VStack,
  SimpleGrid,
  Text,
  Box,
  Collapse,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import SpellCard from './SpellCard';

const SpellList = ({ character, onForgetSpell }) => {
  const [expandedLevels, setExpandedLevels] = useState(new Set([0]));

  const toggleLevel = (level) => {
    const newExpanded = new Set(expandedLevels);
    if (newExpanded.has(level)) {
      newExpanded.delete(level);
    } else {
      newExpanded.add(level);
    }
    setExpandedLevels(newExpanded);
  };

  const spellsByLevel = character.spells.reduce((acc, spell) => {
    acc[spell.level] = acc[spell.level] || [];
    acc[spell.level].push(spell);
    return acc;
  }, {});

  return (
    <VStack spacing={4} align="stretch">
      {Object.entries(spellsByLevel).sort(([a], [b]) => Number(a) - Number(b)).map(([level, spells]) => (
        <Box key={level}>
          <Button
            variant="ghost"
            width="100%"
            justifyContent="space-between"
            onClick={() => toggleLevel(Number(level))}
            mb={2}
          >
            <Text fontWeight="bold">
              Level {level} Spells ({spells.length})
            </Text>
          </Button>
          
          <Collapse in={expandedLevels.has(Number(level))}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} mb={4}>
              {spells.map(spell => (
                <SpellCard
                  key={spell.id}
                  spell={spell}
                  onForgetSpell={onForgetSpell}
                />
              ))}
            </SimpleGrid>
          </Collapse>
        </Box>
      ))}
    </VStack>
  );
};

export default SpellList;

