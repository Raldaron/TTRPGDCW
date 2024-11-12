import React from 'react';
import {
  VStack,
  HStack,
  Box,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import WeaponSlot from './WeaponSlot';
import ArmorSlot from './ArmorSlot';
import UtilitySlot from './UtilitySlot';
import EquipItemModal from './EquipItemModal';

const EquipmentSection = ({ character, onCharacterUpdate }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');

  const armorSlots = [
    { key: 'head', name: 'Head' },
    { key: 'face', name: 'Face' },
    { key: 'neck', name: 'Neck' },
    { key: 'shoulders', name: 'Shoulders' },
    { key: 'torso', name: 'Torso' },
    { key: 'arms', name: 'Arms' },
    { key: 'hands', name: 'Hands' },
    { key: 'waist', name: 'Waist' },
    { key: 'legs', name: 'Legs' },
    { key: 'feet', name: 'Feet' }
  ];

  const handleEquipItem = (slot, item) => {
    const updatedEquipment = {
      ...character.equipment,
      [slot]: item
    };
    onCharacterUpdate({
      ...character,
      equipment: updatedEquipment
    });
  };

  return (
    <Box p={4} bg={bgColor} borderRadius="lg" borderWidth="1px">
      <VStack spacing={6} align="stretch">
        {/* Weapons Section */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={3}>Weapons</Text>
          <HStack spacing={4}>
            <WeaponSlot
              label="Primary"
              weapon={character.equipment.weapons.primary}
              onEquip={(item) => handleEquipItem('weapons.primary', item)}
              inventory={character.inventory}
            />
            <WeaponSlot
              label="Secondary"
              weapon={character.equipment.weapons.secondary}
              onEquip={(item) => handleEquipItem('weapons.secondary', item)}
              inventory={character.inventory}
            />
          </HStack>
        </Box>

        {/* Armor Section */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={3}>Armor</Text>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={4}>
            {armorSlots.map(slot => (
              <ArmorSlot
                key={slot.key}
                label={slot.name}
                item={character.equipment.armor[slot.key]}
                onEquip={(item) => handleEquipItem(`armor.${slot.key}`, item)}
                inventory={character.inventory}
              />
            ))}
          </SimpleGrid>
        </Box>

        {/* Utility Section */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={3}>Utility Items</Text>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={4}>
            {Array.from({ length: 10 }).map((_, index) => (
              <UtilitySlot
                key={index}
                slotNumber={index + 1}
                item={character.equipment.utilities[index]}
                onEquip={(item) => {
                  const newUtilities = [...character.equipment.utilities];
                  newUtilities[index] = item;
                  handleEquipItem('utilities', newUtilities);
                }}
                inventory={character.inventory}
              />
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};

export default EquipmentSection;

