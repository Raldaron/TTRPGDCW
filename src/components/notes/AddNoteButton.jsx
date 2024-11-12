import React from 'react';
import {
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import NotesEditor from './NotesEditor';

const AddNoteButton = ({ onAddNote }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="blue"
        onClick={onOpen}
      >
        Add New Note
      </Button>

      <NotesEditor
        isOpen={isOpen}
        onClose={onClose}
        onSave={onAddNote}
      />
    </>
  );
};

export default AddNoteButton;