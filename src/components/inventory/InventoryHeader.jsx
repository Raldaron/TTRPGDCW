import React from 'react';
import {
  HStack,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import AddItemModal from './AddItemModal';

const InventoryHeader = ({ onAddItem, onSearch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack spacing={4} align="stretch">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">Inventory</Text>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          onClick={onOpen}
        >
          Add Item
        </Button>
      </HStack>

      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Search inventory..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </InputGroup>

      <AddItemModal
        isOpen={isOpen}
        onClose={onClose}
        onAddItem={onAddItem}
      />
    </VStack>
  );
};

export default InventoryHeader;

