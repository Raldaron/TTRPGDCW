import React from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import EquipItemModal from './EquipItemModal';
import ItemDetailModal from './ItemDetailModal';

const UtilitySlot = ({ slotNumber, item, onEquip, inventory }) => {
  const { 
    isOpen: isEquipOpen, 
    onOpen: onEquipOpen, 
    onClose: onEquipClose 
  } = useDisclosure();
  
  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    onClose: onDetailClose
  } = useDisclosure();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      p={3}
      borderWidth="1px"
      borderRadius="md"
      bg={bgColor}
      borderColor={borderColor}
    >
      <VStack spacing={2} align="stretch">
        <Text fontWeight="bold">Utility {slotNumber}</Text>
        
        {item ? (
          <>
            <Text
              cursor="pointer"
              onClick={onDetailOpen}
              _hover={{ color: 'blue.500' }}
              fontSize="sm"
            >
              {item.name}
            </Text>
            <Button size="sm" onClick={onEquipOpen}>
              Change
            </Button>
          </>
        ) : (
          <Button size="sm" onClick={onEquipOpen}>
            Equip
          </Button>
        )}
      </VStack>

      <EquipItemModal
        isOpen={isEquipOpen}
        onClose={onEquipClose}
        onEquip={onEquip}
        inventory={inventory.filter(item => 
          item.itemtype !== 'weapon' && item.itemtype !== 'armor'
        )}
        currentItem={item}
      />

      <ItemDetailModal
        isOpen={isDetailOpen}
        onClose={onDetailClose}
        item={item}
      />
    </Box>
  );
};

export default UtilitySlot;

