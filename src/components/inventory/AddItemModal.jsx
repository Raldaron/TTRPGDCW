import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';

const AddItemModal = ({ isOpen, onClose, onAddItem }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await fetch('/items.json');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error loading items:', error);
      }
    };
    loadItems();
  }, []);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    if (selectedItem) {
      onAddItem(selectedItem);
      onClose();
      setSelectedItem(null);
      setSearchTerm('');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Item to Inventory</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Search Items</FormLabel>
              <Input
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Select Item</FormLabel>
              <Select
                value={selectedItem?.id || ''}
                onChange={(e) => {
                  const item = items.find(i => i.id === e.target.value);
                  setSelectedItem(item);
                }}
              >
                <option value="">Select an item...</option>
                {filteredItems.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.itemtype})
                  </option>
                ))}
              </Select>
            </FormControl>

            {selectedItem && (
              <VStack align="stretch" spacing={3} p={3} bg="gray.50" borderRadius="md">
                <Text fontWeight="bold">Selected Item Details:</Text>
                <Text>Type: {selectedItem.itemtype}</Text>
                <Text>Rarity: {selectedItem.rarity}</Text>
                <Text>{selectedItem.description}</Text>
              </VStack>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleAdd}
            isDisabled={!selectedItem}
          >
            Add to Inventory
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddItemModal;