import React, { useEffect, useState } from 'react';
import {
  VStack,
  Box,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import ItemDetailModal from './ItemDetailModal';

const TraitsList = ({ character }) => {
  const [traits, setTraits] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTrait, setSelectedTrait] = useState(null);

  useEffect(() => {
    const loadTraits = async () => {
      try {
        const response = await fetch('/traits.json');
        const data = await response.json();
        setTraits(data);
      } catch (error) {
        console.error('Error loading traits:', error);
      }
    };
    loadTraits();
  }, []);

  const handleTraitClick = (trait) => {
    setSelectedTrait(trait);
    onOpen();
  };

  return (
    <VStack spacing={3} align="stretch">
      {character.traits.map((trait, index) => (
        <Box
          key={index}
          p={3}
          borderWidth="1px"
          borderRadius="md"
          _hover={{ bg: 'gray.50' }}
          cursor="pointer"
          onClick={() => handleTraitClick(trait)}
        >
          <Text fontWeight="bold">{trait.name}</Text>
          <Text fontSize="sm" color="gray.600">{trait.description}</Text>
        </Box>
      ))}

      <ItemDetailModal
        isOpen={isOpen}
        onClose={onClose}
        item={selectedTrait}
      />
    </VStack>
  );
};

export default TraitsList;

