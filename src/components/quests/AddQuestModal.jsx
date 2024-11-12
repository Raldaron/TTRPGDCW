import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  IconButton,
  Text,
  Checkbox,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

const AddQuestModal = ({ isOpen, onClose, onAddQuest }) => {
  const [quest, setQuest] = useState({
    id: Date.now().toString(),
    title: '',
    description: '',
    objectives: [],
    rewards: '',
    status: 'active',
    progress: []
  });

  const [newObjective, setNewObjective] = useState('');

  const handleSubmit = () => {
    onAddQuest(quest);
    onClose();
    setQuest({
      id: Date.now().toString(),
      title: '',
      description: '',
      objectives: [],
      rewards: '',
      status: 'active',
      progress: []
    });
  };

  const addObjective = () => {
    if (newObjective.trim()) {
      setQuest({
        ...quest,
        objectives: [
          ...quest.objectives,
          { id: Date.now().toString(), text: newObjective, completed: false }
        ]
      });
      setNewObjective('');
    }
  };

  const removeObjective = (id) => {
    setQuest({
      ...quest,
      objectives: quest.objectives.filter(obj => obj.id !== id)
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Quest</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Quest Title</FormLabel>
              <Input
                value={quest.title}
                onChange={(e) => setQuest({ ...quest, title: e.target.value })}
                placeholder="Enter quest title"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={quest.description}
                onChange={(e) => setQuest({ ...quest, description: e.target.value })}
                placeholder="Enter quest description"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Objectives</FormLabel>
              <HStack>
                <Input
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                  placeholder="Enter objective"
                />
                <IconButton
                  icon={<AddIcon />}
                  onClick={addObjective}
                  aria-label="Add objective"
                />
              </HStack>
              
              <VStack mt={2} align="stretch">
                {quest.objectives.map(objective => (
                  <HStack key={objective.id}>
                    <Text flex={1}>{objective.text}</Text>
                    <IconButton
                      size="sm"
                      icon={<DeleteIcon />}
                      onClick={() => removeObjective(objective.id)}
                      aria-label="Remove objective"
                    />
                  </HStack>
                ))}
              </VStack>
            </FormControl>

            <FormControl>
              <FormLabel>Rewards</FormLabel>
              <Textarea
                value={quest.rewards}
                onChange={(e) => setQuest({ ...quest, rewards: e.target.value })}
                placeholder="Enter quest rewards"
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isDisabled={!quest.title || !quest.description}
          >
            Add Quest
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddQuestModal;

