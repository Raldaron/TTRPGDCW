import React, { useState, useEffect } from 'react';
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
  Progress,
  Badge,
  Checkbox,
  Textarea,
  Input,
} from '@chakra-ui/react';

const QuestDetailModal = ({ quest, isOpen, onClose, onUpdate }) => {
  const [editedQuest, setEditedQuest] = useState(quest);
  const [newProgress, setNewProgress] = useState('');

  useEffect(() => {
    setEditedQuest(quest);
  }, [quest]);

  if (!quest) return null;

  const handleObjectiveToggle = (objectiveId) => {
    const updatedObjectives = editedQuest.objectives.map(obj =>
      obj.id === objectiveId ? { ...obj, completed: !obj.completed } : obj
    );
    const updatedQuest = { ...editedQuest, objectives: updatedObjectives };
    setEditedQuest(updatedQuest);
    onUpdate(updatedQuest);
  };

  const addProgress = () => {
    if (newProgress.trim()) {
      const updatedQuest = {
        ...editedQuest,
        progress: [
          ...editedQuest.progress,
          {
            id: Date.now().toString(),
            text: newProgress,
            timestamp: new Date().toISOString()
          }
        ]
      };
      setEditedQuest(updatedQuest);
      onUpdate(updatedQuest);
      setNewProgress('');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack justify="space-between">
            <Text>{quest.title}</Text>
            <Badge colorScheme={
              quest.status === 'completed' ? 'green' :
              quest.status === 'failed' ? 'red' : 'blue'
            }>
              {quest.status.charAt(0).toUpperCase() + quest.status.slice(1)}
            </Badge>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Text>{quest.description}</Text>

            {quest.objectives && quest.objectives.length > 0 && (
              <VStack align="stretch">
                <Text fontWeight="bold">Objectives:</Text>
                {quest.objectives.map(objective => (
                  <Checkbox
                    key={objective.id}
                    isChecked={objective.completed}
                    onChange={() => handleObjectiveToggle(objective.id)}
                    isDisabled={quest.status !== 'active'}
                  >
                    {objective.text}
                  </Checkbox>
                ))}
                
                <Progress
                  value={
                    (quest.objectives.filter(obj => obj.completed).length /
                    quest.objectives.length) * 100
                  }
                  size="sm"
                  colorScheme={
                    quest.status === 'completed' ? 'green' :
                    quest.status === 'failed' ? 'red' : 'blue'
                  }
                />
              </VStack>
            )}

            {quest.rewards && (
              <VStack align="stretch">
                <Text fontWeight="bold">Rewards:</Text>
                <Text>{quest.rewards}</Text>
              </VStack>
            )}

            <VStack align="stretch">
              <Text fontWeight="bold">Progress Log:</Text>
              <HStack>
                <Input
                  placeholder="Add progress update..."
                  value={newProgress}
                  onChange={(e) => setNewProgress(e.target.value)}
                  isDisabled={quest.status !== 'active'}
                />
                <Button
                  onClick={addProgress}
                  isDisabled={!newProgress.trim() || quest.status !== 'active'}
                >
                  Add
                </Button>
              </HStack>

              <VStack align="stretch" maxH="200px" overflowY="auto">
                {editedQuest.progress.map(entry => (
                  <Box
                    key={entry.id}
                    p={2}
                    borderWidth="1px"
                    borderRadius="md"
                  >
                    <Text fontSize="sm">{entry.text}</Text>
                    <Text fontSize="xs" color="gray.500">
                      {new Date(entry.timestamp).toLocaleString()}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default QuestDetailModal;

