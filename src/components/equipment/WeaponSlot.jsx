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

const WeaponSlot = ({ label, weapon, onEquip, inventory }) => {
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
      width="200px"
    >
      <VStack spacing={2} align="stretch">
        <Text fontWeight="bold">{label}</Text>
        
        {weapon ? (
          <>
            <Text
              cursor="pointer"
              onClick={onDetailOpen}
              _hover={{ color: 'blue.500' }}
            >
              {weapon.name}
            </Text>
            <Button size="sm" onClick={onEquipOpen}>
              Change Weapon
            </Button>
          </>
        ) : (
          <Button size="sm" onClick={onEquipOpen}>
            Equip Weapon
          </Button>
        )}
      </VStack>

      <EquipItemModal
        isOpen={isEquipOpen}
        onClose={onEquipClose}
        onEquip={onEquip}
        inventory={inventory.filter(item => item.itemtype === 'weapon')}
        currentItem={weapon}
      />

      <ItemDetailModal
        isOpen={isDetailOpen}
        onClose={onDetailClose}
        item={weapon}
      />
    </Box>
  );
};

export default WeaponSlot;

