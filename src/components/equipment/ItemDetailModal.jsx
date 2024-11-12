import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  Badge,
} from '@chakra-ui/react';

const ItemDetailModal = ({ isOpen, onClose, item }) => {
  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{item.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={3}>
            <Text>{item.description}</Text>
            
            {item.manaCost && (
              <Text>
                <Badge colorScheme="blue">Mana Cost: {item.manaCost}</Badge>
              </Text>
            )}
            
            {item.range && (
              <Text>
                <Badge colorScheme="green">Range: {item.range}</Badge>
              </Text>
            )}
            
            {item.damage && (
              <Text>
                <Badge colorScheme="red">Damage: {item.damage}</Badge>
              </Text>
            )}
            
            {item.duration && (
              <Text>
                <Badge colorScheme="purple">Duration: {item.duration}</Badge>
              </Text>
            )}
            
            {item.effect && (
              <Text>
                <Badge colorScheme="orange">Effect: {item.effect}</Badge>
              </Text>
            )}
            
            {item.bonus && (
              <Text>
                <Badge colorScheme="yellow">Bonus: {item.bonus}</Badge>
              </Text>
            )}
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

export default ItemDetailModal;