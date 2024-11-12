import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Button,
  SimpleGrid,
  Text,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';

const LearnSpellModal = ({
  isOpen,
  onClose,
  onLearnSpell,
  character,
  availableSpells,
  filters
}) => {
  const [selectedSpell, setSelectedSpell] = useState(null);
  
  const filteredSpells = availableSpells.filter(spell => {
    const matchesSearch = spell.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      spell.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesSchool = filters.school === 'all' || spell.school.toLowerCase() === filters.school;
    const matchesLevel = filters.level === 'all' || spell.level === Number(filters.level);
    const isLearnable = !character.spells.find(s => s.id === spell.id);
    return matchesSearch && matchesSchool && matchesLevel && isLearnable;
  });

  const handleLearn = () => {
    if (selectedSpell) {
      onLearnSpell(selectedSpell);
      onClose();
      setSelectedSpell(null);
    }
  };

  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const selectedBgColor = useColorModeValue('blue.50', 'blue.700');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Learn New Spell</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4} align="stretch">
            <SimpleGrid columns={1} spacing={3} maxHeight="400px" overflowY="auto">
              {filteredSpells.map(spell => (
                <Box
                  key={spell.id}
                  p={3}
                  borderRadius="md"
                  bg={selectedSpell?.id === spell.id ? selectedBgColor : bgColor}
                  cursor="pointer"
                  onClick={() => setSelectedSpell(spell)}
                  _hover={{ bg: selectedBgColor }}
                >
                  <VStack align="stretch" spacing={2}>
                    <HStack justify="space-between">
                      <Text fontWeight="bold">{spell.name}</Text>
                      <Badge colorScheme="purple">Level {spell.level}</Badge>
                    </HStack>
                    <Text fontSize="sm">{spell.description}</Text>
                    <HStack>
                      <Badge colorScheme="blue">MP: {spell.manaCost}</Badge>
                      <Badge colorScheme="green">Range: {spell.range}</Badge>
                      <Badge>{spell.school}</Badge>
                    </HStack>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleLearn}
            isDisabled={!selectedSpell}
          >
            Learn Spell
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LearnSpellModal;