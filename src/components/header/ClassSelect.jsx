import React from 'react';
import {
    Select,
    Box,
    VStack,
    Text,
    Badge,
    Collapse,
    useDisclosure,
    List,
    ListItem,
    ListIcon,
    Divider
} from '@chakra-ui/react';
import {
    ChevronDownIcon,
    ChevronUpIcon,
    InfoIcon,
    StarIcon
} from '@chakra-ui/icons';


const ClassSelect = ({ value, onChange, classes }) => {
    const { isOpen, onToggle } = useDisclosure();
    const selectedClass = classes[value];

    const renderBonusList = (bonuses, title) => (
        bonuses?.length > 0 && (
            <Box mt={2}>
                <Text fontWeight="semibold">{title}:</Text>
                <List spacing={1}>
                    {bonuses.map((bonus, index) => (
                        <ListItem key={index} fontSize="sm">
                            <ListIcon as={StarIcon} color="yellow.500" />
                            {bonus}
                        </ListItem>
                    ))}
                </List>
            </Box>
        )
    );

    return (
        <VStack align="stretch" spacing={2} w="full">
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Select Class"
                size="lg"
            >
                {Object.entries(classes)
                    .filter(([id]) => id !== 'boringNothing')
                    .map(([id, classData]) => (
                        <option key={id} value={id}>{classData.name}</option>
                    ))}
            </Select>

            {selectedClass && value !== 'boringNothing' && (
                <Box
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    bg="gray.50"
                    _dark={{ bg: 'gray.700' }}
                >
                    <VStack align="stretch" spacing={3}>
                        <Box
                            cursor="pointer"
                            onClick={onToggle}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Text fontSize="lg" fontWeight="bold">{selectedClass.name}</Text>
                            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        </Box>

                        <Collapse in={isOpen}>
                            <VStack align="stretch" spacing={3}>
                                <Text>{selectedClass.description}</Text>

                                <Badge colorScheme="blue" alignSelf="start">
                                    Archetype: {selectedClass.archetype}
                                </Badge>

                                <Box>
                                    <Text fontWeight="semibold">Primary Attributes:</Text>
                                    <List spacing={1}>
                                        {selectedClass.primaryVitals.map((vital, index) => (
                                            <ListItem key={index} fontSize="sm">
                                                <ListIcon as={InfoIcon} color="green.500" />
                                                {vital}
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>

                                {renderBonusList(selectedClass.vitalBonus, "Vital Bonuses")}
                                {renderBonusList(selectedClass.skillBonus, "Skill Bonuses")}

                                {selectedClass.abilities?.length > 0 && (
                                    <Box>
                                        <Text fontWeight="semibold">Class Abilities:</Text>
                                        <List spacing={1}>
                                            {selectedClass.abilities.map((ability, index) => (
                                                <ListItem key={index} fontSize="sm">
                                                    <ListIcon as={InfoIcon} color="blue.500" />
                                                    {ability}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                )}

                                <Badge colorScheme="purple" alignSelf="start">
                                    Armor Rating Modifier: {selectedClass.armorRating}
                                </Badge>
                            </VStack>
                        </Collapse>
                    </VStack>
                </Box>
            )}
        </VStack>
    );
};


export default ClassSelect;