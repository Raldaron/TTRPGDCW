import React from 'react';
import {
  VStack,
  Box,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import ItemDetailModal from './ItemDetailModal';

const ActionsList = ({ character }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAction, setSelectedAction] = React.useState(null);

  const handleActionClick = (action) => {
    setSelectedAction(action);
    onOpen();
  };

  const getAvailableActions = () => {
    const actions = [];
    // Add actions from equipped items
    if (character.equipment.weapons.primary) {
      actions.push(...character.equipment.weapons.primary.abilities);
    }
    if (character.equipment.weapons.secondary) {
      actions.push(...character.equipment.weapons.secondary.abilities);
    }
    // Add actions from abilities
    actions.push(...character.abilities.filter(ability => ability.type === 'action'));
    return actions;
  };

  return (
    <VStack spacing={3} align="stretch">
      {getAvailableActions().map((action, index) => (
        <Box 
          key={index}
          p={3}
          borderWidth="1px"
          borderRadius="md"
          _hover={{ bg: 'gray.50' }}
          cursor="pointer"
          onClick={() => handleActionClick(action)}
        >
          <Text fontWeight="bold">{action.name}</Text>
          <Text fontSize="sm" color="gray.600">{action.description}</Text>
        </Box>
      ))}
      
      <ItemDetailModal
        isOpen={isOpen}
        onClose={onClose}
        item={selectedAction}
      />
    </VStack>
  );
};

export default ActionsList;

