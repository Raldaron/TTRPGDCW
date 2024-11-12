import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';

const PointsDisplay = ({ label, value, colorScheme }) => {
  const bgColor = useColorModeValue(`${colorScheme}.100`, `${colorScheme}.700`);
  
  return (
    <Box p={2} borderRadius="md" bg={bgColor}>
      <Text>{label}: {value}</Text>
    </Box>
  );
};

export default PointsDisplay;