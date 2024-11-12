import React, { useEffect, useState } from 'react';
import {
  VStack,
  Box,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import ItemDetailModal from './ItemDetailModal';

const AbilitiesList = ({ character }) => {
  const [abilities, setAbilities] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAbility, setSelectedAbility] = useState(null);

  useEffect(() => {
    const loadAbilities = async () => {
      try {
        const response = await fetch('/abilities.json');
        const data = await response.json();
        setAbilities(data);
      } catch (error) {
        console.error('Error loading abilities:', error);
      }
    };
    loadAbilities();
  }, []);

  const handleAbilityClick = (ability) => {
    setSelectedAbility(ability);
    onOpen();
  };

  return (
    <VStack spacing={3} align="stretch">
      {character.abilities.map((ability, index) => (
        <Box
          key={index}
          p={3}
          borderWidth="1px"
          borderRadius="md"
          _hover={{ bg: 'gray.50' }}
          cursor="pointer"
          onClick={() => handleAbilityClick(ability)}
        >
          <Text fontWeight="bold">{ability.name}</Text>
          <Text fontSize="sm" color="gray.600">{ability.description}</Text>
        </Box>
      ))}

      <ItemDetailModal
        isOpen={isOpen}
        onClose={onClose}
        item={selectedAbility}
      />
    </VStack>
  );
};

export default AbilitiesList;

