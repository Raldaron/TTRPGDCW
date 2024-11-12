import React, { useState } from 'react';
import {
  SimpleGrid,
  Input,
  VStack,
} from '@chakra-ui/react';
import NoteCard from './NoteCard';

const NotesList = ({ notes, onUpdateNote, onDeleteNote }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <VStack spacing={4} align="stretch">
      <Input
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {filteredNotes.map(note => (
          <NoteCard
            key={note.id}
            note={note}
            onUpdate={onUpdateNote}
            onDelete={onDeleteNote}
          />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default NotesList;

