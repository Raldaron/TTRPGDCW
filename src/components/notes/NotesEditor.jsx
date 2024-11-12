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
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';

const NotesEditor = ({ note, isOpen, onClose, onSave }) => {
  const [editedNote, setEditedNote] = useState({
    title: '',
    content: '',
    category: ''
  });

  useEffect(() => {
    if (note) {
      setEditedNote(note);
    } else {
      setEditedNote({
        title: '',
        content: '',
        category: ''
      });
    }
  }, [note]);

  const handleSave = () => {
    onSave(editedNote);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {note ? 'Edit Note' : 'New Note'}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                value={editedNote.title}
                onChange={(e) => setEditedNote({
                  ...editedNote,
                  title: e.target.value
                })}
                placeholder="Note title"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Category</FormLabel>
              <Input
                value={editedNote.category}
                onChange={(e) => setEditedNote({
                  ...editedNote,
                  category: e.target.value
                })}
                placeholder="Note category (optional)"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Content</FormLabel>
              <Textarea
                value={editedNote.content}
                onChange={(e) => setEditedNote({
                  ...editedNote,
                  content: e.target.value
                })}
                placeholder="Note content"
                minH="200px"
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
            onClick={handleSave}
            isDisabled={!editedNote.title || !editedNote.content}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NotesEditor;

