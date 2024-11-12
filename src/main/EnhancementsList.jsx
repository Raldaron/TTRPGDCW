import React from 'react';
import {
  VStack,
  Box,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import ItemDetailModal from './ItemDetailModal';

const EnhancementsList = ({ character }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEnhancement, setSelectedEnhancement] = useState(null);

  const handleEnhancementClick = (enhancement) => {
    setSelectedEnhancement(enhancement);
    onOpen();
  };

  return (
    <VStack spacing={3} align="stretch">
      {character.enhancements.map((enhancement, index) => (
        <Box
          key={index}
          p={3}
          borderWidth="1px"
          borderRadius="md"
          _hover={{ bg: 'gray.50' }}
          cursor="pointer"
          onClick={() => handleEnhancementClick(enhancement)}
        >
          <Text fontWeight="bold">{enhancement.name}</Text>
          <Text fontSize="sm" color="gray.600">{enhancement.description}</Text>
          <Text fontSize="sm" color="purple.600">
            Bonus: {enhancement.bonus}
          </Text>
        </Box>
      ))}

      <ItemDetailModal
        isOpen={isOpen}
        onClose={onClose}
        item={selectedEnhancement}
      />
    </VStack>
  );
};

export default EnhancementsList;

