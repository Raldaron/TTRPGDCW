import React from 'react';
import {
  Box,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import NotesEditor from './NotesEditor';
import NotesList from './NotesList';
import AddNoteButton from './AddNoteButton';

const NotesSection = ({ character, onCharacterUpdate }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');

  const handleAddNote = (newNote) => {
    onCharacterUpdate({
      ...character,
      notes: [...character.notes, {
        id: Date.now().toString(),
        ...newNote,
        timestamp: new Date().toISOString()
      }]
    });
  };

  const handleUpdateNote = (updatedNote) => {
    onCharacterUpdate({
      ...character,
      notes: character.notes.map(note =>
        note.id === updatedNote.id ? updatedNote : note
      )
    });
  };

  const handleDeleteNote = (noteId) => {
    onCharacterUpdate({
      ...character,
      notes: character.notes.filter(note => note.id !== noteId)
    });
  };

  return (
    <Box p={4} bg={bgColor} borderRadius="lg" borderWidth="1px">
      <VStack spacing={4} align="stretch">
        <AddNoteButton onAddNote={handleAddNote} />
        <NotesList
          notes={character.notes}
          onUpdateNote={handleUpdateNote}
          onDeleteNote={handleDeleteNote}
        />
      </VStack>
    </Box>
  );
};

export default NotesSection;

