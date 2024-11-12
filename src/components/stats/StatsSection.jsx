import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';
import VitalsTab from './VitalsTab';
import SkillsTab from './SkillsTab';

const StatsSection = ({ character, onCharacterUpdate }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Tabs variant="enclosed" colorScheme="teal" isLazy>
        <TabList>
          <Tab>Vitals</Tab>
          <Tab>Skills</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VitalsTab 
              character={character} 
              onCharacterUpdate={onCharacterUpdate} 
            />
          </TabPanel>
          <TabPanel>
            <SkillsTab 
              character={character} 
              onCharacterUpdate={onCharacterUpdate} 
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default StatsSection;

