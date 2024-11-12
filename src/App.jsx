import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    VStack,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    useToast,
    Heading,
    useColorMode,
    Button,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

// Import all section components
import HeaderSection from './components/header/HeaderSection';
import StatsSection from './components/stats/StatsSection';
import EquipmentSection from './components/equipment/EquipmentSection';
import InventorySection from './components/inventory/InventorySection';
import ArcanaSection from './components/arcana/ArcanaSection';
import QuestLogSection from './components/quests/QuestLogSection';
import NotesSection from './components/notes/NotesSection';

// Import RaceSelect component and races data
import RaceSelect from './components/header/RaceSelect';
import racesData from './data/races.json';

const App = () => {
    const [character, setCharacter] = useState(null);
    const [races, setRaces] = useState({});
    const [selectedRace, setSelectedRace] = useState('');
    const toast = useToast();
    const { colorMode, toggleColorMode } = useColorMode();

    // Initialize character data
    useEffect(() => {
        const savedCharacter = localStorage.getItem('character');
        if (savedCharacter) {
            setCharacter(JSON.parse(savedCharacter));
        } else {
            // Set default character state
            setCharacter({
                name: '',
                race: '',
                class: '',
                level: 1,
                availableVitalPoints: 0,
                availableSkillPoints: 0,
                attributes: {
                    strength: 1,
                    dexterity: 1,
                    stamina: 1,
                    intelligence: 1,
                    perception: 1,
                    wit: 1,
                    charisma: 1,
                    manipulation: 1,
                    appearance: 1,
                },
                skills: {
                    // Combat Skills
                    archery: 0,
                    artillery: 0,
                    block: 0,
                    closeCombat: 0,
                    dodge: 0,
                    explosivesHandling: 0,
                    firearms: 0,
                    melee: 0,
                    parry: 0,
                    tactics: 0,

                    // Physical Skills
                    acrobatics: 0,
                    athletics: 0,
                    disguise: 0,
                    endurance: 0,
                    holdBreath: 0,
                    resilience: 0,
                    sleightOfHand: 0,
                    stealth: 0,
                    survival: 0,

                    // Social Skills
                    animalKen: 0,
                    deception: 0,
                    empathy: 0,
                    intimidation: 0,
                    performance: 0,
                    persuasion: 0,
                    seduction: 0,
                    senseDeception: 0,

                    // Mental Skills
                    alchemy: 0,
                    arcana: 0,
                    awareness: 0,
                    detectTrap: 0,
                    engineering: 0,
                    investigation: 0,
                    lore: 0,
                    medicine: 0,
                    nature: 0,
                    perception: 0,
                    scrounge: 0,
                    tracking: 0,
                },
                hitPoints: {
                    current: 10,
                    max: 10,
                },
                manaPoints: {
                    current: 10,
                    max: 10,
                },
                actionPoints: 3,
                armorRating: 0,
                equipment: {
                    weapons: {
                        primary: null,
                        secondary: null,
                    },
                    armor: {
                        head: null,
                        face: null,
                        neck: null,
                        shoulders: null,
                        torso: null,
                        arms: null,
                        hands: null,
                        waist: null,
                        legs: null,
                        feet: null,
                    },
                    utilities: Array(10).fill(null),
                },
                inventory: [],
                spells: [],
                abilities: [],
                traits: [],
                enhancements: [],
                quests: [],
                notes: [],
            });
        }
    }, []);

    // Load races data
    useEffect(() => {
        setRaces(racesData);
    }, []);

    // Save character data whenever it changes
    useEffect(() => {
        if (character) {
            localStorage.setItem('character', JSON.stringify(character));
        }
    }, [character]);

    const handleCharacterUpdate = (updatedCharacter) => {
        setCharacter(updatedCharacter);
        toast({
            title: 'Character Updated',
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
    };

    const handleRaceChange = (selectedRaceId) => {
        setSelectedRace(selectedRaceId);
        setCharacter((prevCharacter) => ({
            ...prevCharacter,
            race: selectedRaceId,
        }));
    };

    if (!character) {
        return <Box>Loading...</Box>;
    }

    return (
        <Container maxW="container.xl" py={6}>
            <VStack spacing={6} align="stretch">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Heading as="h1" size="xl">DNGNCRLR</Heading>
                    <Button onClick={toggleColorMode}>
                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    </Button>
                </Box>

                <HeaderSection
                    character={character}
                    onCharacterUpdate={handleCharacterUpdate}
                />

                <RaceSelect
                    value={selectedRace}
                    onChange={handleRaceChange}
                    races={races}
                />

                <Tabs isLazy>
                    <TabList>
                        <Tab>Stats</Tab>
                        <Tab>Equipment</Tab>
                        <Tab>Inventory</Tab>
                        <Tab>Arcana</Tab>
                        <Tab>Quests</Tab>
                        <Tab>Notes</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <StatsSection
                                character={character}
                                onCharacterUpdate={handleCharacterUpdate}
                            />
                        </TabPanel>

                        <TabPanel>
                            <EquipmentSection
                                character={character}
                                onCharacterUpdate={handleCharacterUpdate}
                            />
                        </TabPanel>

                        <TabPanel>
                            <InventorySection
                                character={character}
                                onCharacterUpdate={handleCharacterUpdate}
                            />
                        </TabPanel>

                        <TabPanel>
                            <ArcanaSection
                                character={character}
                                onCharacterUpdate={handleCharacterUpdate}
                            />
                        </TabPanel>

                        <TabPanel>
                            <QuestLogSection
                                character={character}
                                onCharacterUpdate={handleCharacterUpdate}
                            />
                        </TabPanel>

                        <TabPanel>
                            <NotesSection
                                character={character}
                                onCharacterUpdate={handleCharacterUpdate}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </VStack>
        </Container>
    );
};

export default App;
