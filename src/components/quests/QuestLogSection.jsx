import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import QuestList from './QuestList';
import AddQuestButton from './AddQuestButton';
import QuestDetailModal from './QuestDetailModal';

const QuestLogSection = ({ character, onCharacterUpdate }) => {
  const [selectedQuest, setSelectedQuest] = useState(null);
  const bgColor = useColorModeValue('gray.50', 'gray.700');

  const handleAddQuest = (newQuest) => {
    onCharacterUpdate({
      ...character,
      quests: [...character.quests, { ...newQuest, status: 'active', progress: [] }]
    });
  };

  const handleUpdateQuest = (updatedQuest) => {
    onCharacterUpdate({
      ...character,
      quests: character.quests.map(quest =>
        quest.id === updatedQuest.id ? updatedQuest : quest
      )
    });
  };

  const handleDeleteQuest = (questId) => {
    onCharacterUpdate({
      ...character,
      quests: character.quests.filter(quest => quest.id !== questId)
    });
  };

  return (
    <Box p={4} bg={bgColor} borderRadius="lg" borderWidth="1px">
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <AddQuestButton onAddQuest={handleAddQuest} />
        </HStack>

        <Tabs colorScheme="blue" isLazy>
          <TabList>
            <Tab>Active Quests</Tab>
            <Tab>Completed Quests</Tab>
            <Tab>Failed Quests</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <QuestList
                quests={character.quests.filter(q => q.status === 'active')}
                onSelectQuest={setSelectedQuest}
                onUpdateQuest={handleUpdateQuest}
                onDeleteQuest={handleDeleteQuest}
              />
            </TabPanel>
            <TabPanel>
              <QuestList
                quests={character.quests.filter(q => q.status === 'completed')}
                onSelectQuest={setSelectedQuest}
                onUpdateQuest={handleUpdateQuest}
                onDeleteQuest={handleDeleteQuest}
              />
            </TabPanel>
            <TabPanel>
              <QuestList
                quests={character.quests.filter(q => q.status === 'failed')}
                onSelectQuest={setSelectedQuest}
                onUpdateQuest={handleUpdateQuest}
                onDeleteQuest={handleDeleteQuest}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <QuestDetailModal
          quest={selectedQuest}
          isOpen={!!selectedQuest}
          onClose={() => setSelectedQuest(null)}
          onUpdate={handleUpdateQuest}
        />
      </VStack>
    </Box>
  );
};

export default QuestLogSection;

