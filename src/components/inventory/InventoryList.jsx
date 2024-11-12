import React, { useState } from 'react';
import {
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
} from '@chakra-ui/react';
import InventoryItem from './InventoryItem';

const InventoryList = ({ inventory, onRemoveItem }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { key: 'all', label: 'All Items' },
    { key: 'weapon', label: 'Weapons' },
    { key: 'armor', label: 'Armor' },
    { key: 'consumable', label: 'Consumables' },
    { key: 'material', label: 'Materials' },
    { key: 'quest', label: 'Quest Items' },
    { key: 'misc', label: 'Miscellaneous' }
  ];

  const filterItems = (items, category, search) => {
    return items.filter(item => {
      const matchesCategory = category === 'all' || item.itemtype === category;
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  return (
    <Tabs>
      <TabList>
        {categories.map(category => (
          <Tab key={category.key}>{category.label}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {categories.map(category => (
          <TabPanel key={category.key}>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={4}
              maxH="600px"
              overflowY="auto"
              p={2}
            >
              {filterItems(inventory, category.key, searchTerm).map(item => (
                <InventoryItem
                  key={item.id}
                  item={item}
                  onRemove={onRemoveItem}
                />
              ))}
            </SimpleGrid>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default InventoryList;

