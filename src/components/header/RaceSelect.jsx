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

const RaceSelect = ({ value, onChange, races }) => {
    const { isOpen, onToggle } = useDisclosure();
    const selectedRace = races[value];

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
                placeholder="Select Race"
                size="lg"
            >
                {Object.entries(races).map(([id, race]) => (
                    <option key={id} value={id}>{race.name}</option>
                ))}
            </Select>

            {selectedRace && (
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
                            <Text fontSize="lg" fontWeight="bold">{selectedRace.name}</Text>
                            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        </Box>

                        <Collapse in={isOpen}>
                            <VStack align="stretch" spacing={3}>
                                <Text>{selectedRace.description}</Text>

                                {renderBonusList(selectedRace.vitalBonus, "Vital Bonuses")}
                                {renderBonusList(selectedRace.skillBonus, "Skill Bonuses")}

                                {selectedRace.abilities?.length > 0 && (
                                    <Box>
                                        <Text fontWeight="semibold">Racial Abilities:</Text>
                                        <List spacing={1}>
                                            {selectedRace.abilities.map((ability, index) => (
                                                <ListItem key={index} fontSize="sm">
                                                    <ListIcon as={InfoIcon} color="blue.500" />
                                                    {ability}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                )}

                                <Divider />

                                <Box>
                                    <Text fontWeight="semibold">Lore:</Text>
                                    <Text fontSize="sm" mt={1}>{selectedRace.lore}</Text>
                                </Box>

                                <Badge colorScheme="purple" alignSelf="start">
                                    Base Armor Rating: {selectedRace.armorRating}
                                </Badge>
                            </VStack>
                        </Collapse>
                    </VStack>
                </Box>
            )}
        </VStack>
    );
};

export default RaceSelect;
