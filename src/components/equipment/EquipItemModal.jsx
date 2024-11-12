import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Input,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';

const EquipItemModal = ({ 
  isOpen, 
  onClose, 
  onEquip, 
  inventory, 
  currentItem 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEquip = () => {
    onEquip(selectedItem);
    onClose();
    setSelectedItem(null);
    setSearchTerm('');
  };

  const itemBgColor = useColorModeValue('gray.50', 'gray.700');
  const selectedBgColor = useColorModeValue('blue.50', 'blue.900');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Item to Equip</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <VStack spacing={4}>
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {currentItem && (
              <Box p={3} bg="gray.100" borderRadius="md" width="100%">
                <Text fontWeight="bold">Currently Equipped:</Text>
                <Text>{currentItem.name}</Text>
              </Box>
            )}

            <Box maxHeight="400px" overflowY="auto" width="100%">
              <VStack spacing={2} align="stretch">
                {filteredInventory.map((item) => (
                  <Box
                    key={item.id}
                    p={3}
                    borderRadius="md"
                    cursor="pointer"
                    bg={selectedItem?.id === item.id ? selectedBgColor : itemBgColor}
                    onClick={() => setSelectedItem(item)}
                    _hover={{ bg: selectedBgColor }}
                  >
                    <Text fontWeight="bold">{item.name}</Text>
                    <Text fontSize="sm">{item.description}</Text>
                    {item.itemtype === 'weapon' && (
                      <HStack fontSize="sm" color="gray.500">
                        <Text>Damage: {item.damage}</Text>
                        <Text>Range: {item.range}</Text>
                      </HStack>
                    )}
                    {item.itemtype === 'armor' && (
                      <Text fontSize="sm" color="gray.500">
                        Armor Rating: {item.armorrating}
                      </Text>
                    )}
                  </Box>
                ))}
              </VStack>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button 
            colorScheme="blue" 
            onClick={handleEquip}
            isDisabled={!selectedItem}
          >
            Equip
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EquipItemModal;