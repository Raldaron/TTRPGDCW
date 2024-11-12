import React, { useState, useEffect } from 'react';
import {
  VStack,
  HStack,
  Input,
  Select,
  Button,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import LearnSpellModal from './LearnSpellModal';

const SpellSearchBar = ({ character, onLearnSpell }) => {
  const [spells, setSpells] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    school: 'all',
    level: 'all'
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const loadSpells = async () => {
      try {
        const response = await fetch('/spells.json');
        const data = await response.json();
        setSpells(data);
      } catch (error) {
        console.error('Error loading spells:', error);
      }
    };
    loadSpells();
  }, []);

  const magicSchools = [
    'All Schools',
    'Abjuration',
    'Conjuration',
    'Divination',
    'Enchantment',
    'Evocation',
    'Illusion',
    'Necromancy',
    'Transmutation'
  ];

  return (
    <VStack spacing={4} align="stretch">
      <HStack spacing={4}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search spells..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </InputGroup>

        <Select
          value={filters.school}
          onChange={(e) => setFilters({ ...filters, school: e.target.value })}
        >
          {magicSchools.map(school => (
            <option key={school} value={school.toLowerCase()}>
              {school}
            </option>
          ))}
        </Select>

        <Select
          value={filters.level}
          onChange={(e) => setFilters({ ...filters, level: e.target.value })}
        >
          <option value="all">All Levels</option>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={i}>
              Level {i}
            </option>
          ))}
        </Select>

        <Button colorScheme="blue" onClick={onOpen}>
          Learn New Spell
        </Button>
      </HStack>

      <LearnSpellModal
        isOpen={isOpen}
        onClose={onClose}
        onLearnSpell={onLearnSpell}
        character={character}
        availableSpells={spells}
        filters={filters}
      />
    </VStack>
  );
};

export default SpellSearchBar;

