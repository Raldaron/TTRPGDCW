import React, { useEffect, useState } from 'react';
import {
  VStack,
  Box,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import ItemDetailModal from './ItemDetailModal';

const SpellsList = ({ character }) => {
  const [spells, setSpells] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSpell, setSelectedSpell] = useState(null);

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

  const handleSpellClick = (spell) => {
    setSelectedSpell(spell);
    onOpen();
  };

  return (
    <VStack spacing={3} align="stretch">
      {character.spells.map((spell, index) => (
        <Box
          key={index}
          p={3}
          borderWidth="1px"
          borderRadius="md"
          _hover={{ bg: 'gray.50' }}
          cursor="pointer"
          onClick={() => handleSpellClick(spell)}
        >
          <Text fontWeight="bold">{spell.name}</Text>
          <Text fontSize="sm" color="gray.600">{spell.description}</Text>
          <Text fontSize="sm" color="blue.600">
            Mana Cost: {spell.manaCost} | Range: {spell.range}
          </Text>
        </Box>
      ))}

      <ItemDetailModal
        isOpen={isOpen}
        onClose={onClose}
        item={selectedSpell}
      />
    </VStack>
  );
};

export default SpellsList;

