import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  Divider,
} from '@chakra-ui/react';

const SpellDetailModal = ({ isOpen, onClose, spell }) => {
  if (!spell) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack justify="space-between">
            <Text>{spell.name}</Text>
            <Badge colorScheme="purple">Level {spell.level}</Badge>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack align="stretch" spacing={4}>
            <HStack>
              <Badge colorScheme="blue">School: {spell.school}</Badge>
              <Badge colorScheme="green">MP Cost: {spell.manaCost}</Badge>
              <Badge colorScheme="orange">Range: {spell.range}</Badge>
            </HStack>

            {spell.castingTime && (
              <Text>
                <strong>Casting Time:</strong> {spell.castingTime}
              </Text>
            )}
            
            {spell.duration && (
              <Text>
                <strong>Duration:</strong> {spell.duration}
              </Text>
            )}

            <Divider />

            <Text>
              <strong>Description:</strong>
              <br />
              {spell.description}
            </Text>

            {spell.atHigherLevels && (
              <>
                <Divider />
                <Text>
                  <strong>At Higher Levels:</strong>
                  <br />
                  {spell.atHigherLevels}
                </Text>
              </>
            )}

            {spell.components && (
              <Text>
                <strong>Components:</strong> {spell.components}
              </Text>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SpellDetailModal;

