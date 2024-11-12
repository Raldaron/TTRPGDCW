import React from 'react';
import {
  HStack,
  Text,
  Button,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';

const SkillItem = ({
  name,
  value,
  onIncrement,
  canIncrement,
  description,
  associatedAttribute
}) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');

  return (
    <Tooltip label={description} placement="right">
      <HStack
        p={3}
        borderWidth="1px"
        borderRadius="md"
        bg={bgColor}
        justify="space-between"
        w="100%"
      >
        <VStack align="start" spacing={0}>
          <Text fontWeight="medium">{name}</Text>
          <Text fontSize="sm" color="gray.500">
            ({associatedAttribute})
          </Text>
        </VStack>
        <HStack>
          <Text width="40px" textAlign="center" fontWeight="bold">
            {value}
          </Text>
          <Button
            size="sm"
            onClick={onIncrement}
            isDisabled={!canIncrement}
            colorScheme="green"
          >
            +
          </Button>
        </HStack>
      </HStack>
    </Tooltip>
  );
};

export default SkillItem;

