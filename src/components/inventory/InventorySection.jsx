import React from 'react';
import {
  Box,
  VStack,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import InventoryHeader from './InventoryHeader';
import InventoryList from './InventoryList';
import AddItemModal from './AddItemModal';

const InventorySection = ({ character, onCharacterUpdate }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');

  const handleAddItem = (newItem) => {
    onCharacterUpdate({
      ...character,
      inventory: [...character.inventory, newItem]
    });
  };

  const handleRemoveItem = (itemId) => {
    onCharacterUpdate({
      ...character,
      inventory: character.inventory.filter(item => item.id !== itemId)
    });
  };

  return (
    <Box p={4} bg={bgColor} borderRadius="lg" borderWidth="1px">
      <VStack spacing={4} align="stretch">
        <InventoryHeader onAddItem={handleAddItem} />
        <InventoryList
          inventory={character.inventory}
          onRemoveItem={handleRemoveItem}
        />
      </VStack>
    </Box>
  );
};

export default InventorySection;

