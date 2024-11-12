import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  Badge,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import NotesEditor from './NotesEditor';

const NoteCard = ({ note, onUpdate, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <>
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
            <Text fontWeight="bold">{note.title}</Text>
            {note.category && (
              <Badge colorScheme="blue">
                {note.category}
              </Badge>
            )}
          </HStack>

          <Text fontSize="sm" noOfLines={4}>
            {note.content}
          </Text>

          <Text fontSize="xs" color="gray.500">
            {new Date(note.timestamp).toLocaleString()}
          </Text>

          <HStack justify="flex-end">
            <IconButton
              size="sm"
              icon={<EditIcon />}
              aria-label="Edit note"
              onClick={onOpen}
            />
            <IconButton
              size="sm"
              icon={<DeleteIcon />}
              aria-label="Delete note"
              colorScheme="red"
              onClick={() => onDelete(note.id)}
            />
          </HStack>
        </VStack>
      </Box>

      <NotesEditor
        note={note}
        isOpen={isOpen}
        onClose={onClose}
        onSave={onUpdate}
      />
    </>
  );
};

export default NoteCard;

