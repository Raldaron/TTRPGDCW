import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Progress,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

const QuestCard = ({ quest, onSelect, onUpdate, onDelete }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'blue';
      case 'completed': return 'green';
      case 'failed': return 'red';
      default: return 'gray';
    }
  };

  const calculateProgress = () => {
    if (!quest.objectives) return 0;
    const completed = quest.objectives.filter(obj => obj.completed).length;
    return (completed / quest.objectives.length) * 100;
  };

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      bg={bgColor}
      borderColor={borderColor}
      _hover={{ shadow: 'md' }}
    >
      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between">
          <Text fontWeight="bold" fontSize="lg">{quest.title}</Text>
          <Badge colorScheme={getStatusColor(quest.status)}>
            {quest.status.charAt(0).toUpperCase() + quest.status.slice(1)}
          </Badge>
        </HStack>

        <Text fontSize="sm" noOfLines={2}>
          {quest.description}
        </Text>

        {quest.objectives && (
          <Box>
            <Text fontSize="sm" fontWeight="medium" mb={1}>
              Progress
            </Text>
            <Progress
              value={calculateProgress()}
              size="sm"
              colorScheme={getStatusColor(quest.status)}
            />
          </Box>
        )}

        <HStack justify="space-between" mt={2}>
          <HStack>
            <IconButton
              size="sm"
              icon={<EditIcon />}
              aria-label="Edit quest"
              onClick={() => onSelect(quest)}
            />
            <IconButton
              size="sm"
              icon={<DeleteIcon />}
              aria-label="Delete quest"
              colorScheme="red"
              onClick={() => onDelete(quest.id)}
            />
          </HStack>
          
          {quest.status === 'active' && (
            <HStack>
              <IconButton
                size="sm"
                icon={<CheckIcon />}
                aria-label="Complete quest"
                colorScheme="green"
                onClick={() => onUpdate({ ...quest, status: 'completed' })}
              />
              <IconButton
                size="sm"
                icon={<CloseIcon />}
                aria-label="Fail quest"
                colorScheme="red"
                onClick={() => onUpdate({ ...quest, status: 'failed' })}
              />
            </HStack>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default QuestCard;

