import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import ActionsList from './ActionsList';
import AbilitiesList from './AbilitiesList';
import TraitsList from './TraitsList';
import SpellsList from './SpellsList';
import EnhancementsList from './EnhancementsList';

const TabNavigation = ({ character, onCharacterUpdate }) => {
  return (
    <Tabs variant="enclosed" colorScheme="blue" isLazy>
      <TabList>
        <Tab>Actions</Tab>
        <Tab>Abilities</Tab>
        <Tab>Traits</Tab>
        <Tab>Spells</Tab>
        <Tab>Enhancements</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ActionsList 
            character={character} 
            onCharacterUpdate={onCharacterUpdate} 
          />
        </TabPanel>
        <TabPanel>
          <AbilitiesList 
            character={character} 
            onCharacterUpdate={onCharacterUpdate} 
          />
        </TabPanel>
        <TabPanel>
          <TraitsList 
            character={character} 
            onCharacterUpdate={onCharacterUpdate} 
          />
        </TabPanel>
        <TabPanel>
          <SpellsList 
            character={character} 
            onCharacterUpdate={onCharacterUpdate} 
          />
        </TabPanel>
        <TabPanel>
          <EnhancementsList 
            character={character} 
            onCharacterUpdate={onCharacterUpdate} 
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabNavigation;

