import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  IconButton,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { DeleteIcon, InfoIcon } from '@chakra-ui/icons';
import SpellDetailModal from './SpellDetailModal';

const SpellCard = ({ spell, onForgetSpell }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      bg={bgColor}
      borderColor={borderColor}
      _hover={{ shadow: 'md' }}
    >
      <VStack align="stretch" spacing={2}>
        <HStack justify="space-between">
          <Text fontWeight="bold">{spell.name}</Text>
          <Badge colorScheme="purple">
            Level {spell.level}
          </Badge>
        </HStack>

        <Text fontSize="sm" color="gray.500">
          {spell.school}
        </Text>

        <HStack>
          <Badge colorScheme="blue">
            MP: {spell.manaCost}
          </Badge>
          <Badge colorScheme="green">
            Range: {spell.range}
          </Badge>
          {spell.duration && (
            <Badge colorScheme="orange">
              Duration: {spell.duration}
            </Badge>
          )}
        </HStack>

        <Text fontSize="sm" noOfLines={2}>
          {spell.description}
        </Text>

        <HStack justify="space-between" mt={2}>
          <IconButton
            size="sm"
            icon={<InfoIcon />}
            aria-label="Spell details"
            onClick={onOpen}
          />
          <IconButton
            size="sm"
            icon={<DeleteIcon />}
            aria-label="Forget spell"
            colorScheme="red"
            onClick={() => onForgetSpell(spell.id)}
          />
        </HStack>
      </VStack>

      <SpellDetailModal
        isOpen={isOpen}
        onClose={onClose}
        spell={spell}
      />
    </Box>
  );
};

export default SpellCard;

