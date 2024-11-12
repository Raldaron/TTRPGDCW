import React from 'react';
import {
  VStack,
  SimpleGrid,
  Text,
  Box,
  Progress,
  Badge,
  IconButton,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import QuestCard from './QuestCard';

const QuestList = ({
  quests,
  onSelectQuest,
  onUpdateQuest,
  onDeleteQuest
}) => {
  if (quests.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Text color="gray.500">No quests found</Text>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
      {quests.map(quest => (
        <QuestCard
          key={quest.id}
          quest={quest}
          onSelect={onSelectQuest}
          onUpdate={onUpdateQuest}
          onDelete={onDeleteQuest}
        />
      ))}
    </SimpleGrid>
  );
};

export default QuestList;

