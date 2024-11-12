import React from 'react';
import {
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddQuestModal from './AddQuestModal';

const AddQuestButton = ({ onAddQuest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="blue"
        onClick={onOpen}
      >
        Add New Quest
      </Button>

      <AddQuestModal
        isOpen={isOpen}
        onClose={onClose}
        onAddQuest={onAddQuest}
      />
    </>
  );
};

export default AddQuestButton;

