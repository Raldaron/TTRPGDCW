import React from 'react';
import {
  HStack,
  Text,
  Button,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';

const VitalAttribute = ({ 
  name, 
  value, 
  onIncrement, 
  onDecrement, 
  canIncrement, 
  canDecrement,
  description 
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
        <Text fontWeight="medium">{name}</Text>
        <HStack>
          <Button
            size="sm"
            onClick={onDecrement}
            isDisabled={!canDecrement}
            colorScheme="red"
          >
            -
          </Button>
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

export default VitalAttribute;

