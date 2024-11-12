import React from 'react';
import {
  Box,
  HStack,
  VStack,
  Text,
  IconButton,
  Badge,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { DeleteIcon, InfoIcon } from '@chakra-ui/icons';
import ItemDetailModal from '../shared/ItemDetailModal';

const InventoryItem = ({ item, onRemove }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const getRarityColor = (rarity) => {
    const colors = {
      common: 'gray',
      uncommon: 'green',
      rare: 'blue',
      epic: 'purple',
      legendary: 'orange',
      artifact: 'red'
    };
    return colors[rarity.toLowerCase()] || 'gray';
  };

  return (
    <Box
      p={3}
      borderWidth="1px"
      borderRadius="md"
      bg={bgColor}
      borderColor={borderColor}
      position="relative"
      _hover={{ shadow: 'md' }}
    >
      <VStack align="stretch" spacing={2}>
        <HStack justify="space-between">
          <Text fontWeight="bold">{item.name}</Text>
          <Badge colorScheme={getRarityColor(item.rarity)}>
            {item.rarity}
          </Badge>
        </HStack>

        <Text fontSize="sm" noOfLines={2}>
          {item.description}
        </Text>

        <HStack justify="space-between" mt={2}>
          <IconButton
            size="sm"
            icon={<InfoIcon />}
            aria-label="Item details"
            onClick={onOpen}
          />
          <IconButton
            size="sm"
            icon={<DeleteIcon />}
            aria-label="Remove item"
            colorScheme="red"
            onClick={() => onRemove(item.id)}
          />
        </HStack>
      </VStack>

      <ItemDetailModal
        isOpen={isOpen}
        onClose={onClose}
        item={item}
      />
    </Box>
  );
};

export default InventoryItem;

