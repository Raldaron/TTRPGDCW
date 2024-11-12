import React from 'react';
import {
  VStack,
  Text,
  Box,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import SkillCategory from './SkillCategory';

const SkillsTab = ({ character, onCharacterUpdate }) => {
  const skillCategories = {
    combat: {
      title: 'Combat Skills',
      skills: [
        {
          key: 'archery',
          name: 'Archery',
          attribute: 'Dexterity',
          description: 'Proficiency with bows and crossbows'
        },
        {
          key: 'artillery',
          name: 'Artillery',
          attribute: 'Intelligence',
          description: 'Skill with siege weapons and heavy armaments'
        },
        {
          key: 'block',
          name: 'Block',
          attribute: 'Stamina',
          description: 'Ability to defend against incoming attacks with a shield'
        },
        {
          key: 'closeCombat',
          name: 'Close Combat',
          attribute: 'Strength',
          description: 'Fighting in close quarters without weapons'
        },
        {
          key: 'dodge',
          name: 'Dodge',
          attribute: 'Dexterity',
          description: 'Ability to avoid incoming attacks'
        },
        {
          key: 'explosivesHandling',
          name: 'Explosives Handling',
          attribute: 'Intelligence',
          description: 'Safe handling and deployment of explosive devices'
        },
        {
          key: 'firearms',
          name: 'Firearms',
          attribute: 'Dexterity',
          description: 'Proficiency with guns and similar weapons'
        },
        {
          key: 'melee',
          name: 'Melee',
          attribute: 'Strength',
          description: 'Skill with hand-held weapons'
        },
        {
          key: 'parry',
          name: 'Parry',
          attribute: 'Dexterity',
          description: 'Deflecting attacks with a weapon'
        },
        {
          key: 'tactics',
          name: 'Tactics',
          attribute: 'Intelligence',
          description: 'Strategic combat planning and execution'
        }
      ]
    },
    physical: {
      title: 'Physical Skills',
      skills: [
        {
          key: 'acrobatics',
          name: 'Acrobatics',
          attribute: 'Dexterity',
          description: 'Performing agile maneuvers and maintaining balance'
        },
        {
          key: 'athletics',
          name: 'Athletics',
          attribute: 'Strength',
          description: 'General physical fitness and sports abilities'
        },
        {
          key: 'disguise',
          name: 'Disguise',
          attribute: 'Appearance',
          description: 'Ability to alter appearance and impersonate others'
        },
        {
          key: 'endurance',
          name: 'Endurance',
          attribute: 'Stamina',
          description: 'Physical stamina and resistance to fatigue'
        },
        {
          key: 'holdBreath',
          name: 'Hold Breath',
          attribute: 'Stamina',
          description: 'Ability to hold breath underwater or in harmful environments'
        },
        {
          key: 'resilience',
          name: 'Resilience',
          attribute: 'Stamina',
          description: 'Recovery from physical stress and injury'
        },
        {
          key: 'sleightOfHand',
          name: 'Sleight of Hand',
          attribute: 'Dexterity',
          description: 'Manual dexterity and fine manipulation'
        },
        {
          key: 'stealth',
          name: 'Stealth',
          attribute: 'Dexterity',
          description: 'Moving silently and remaining unseen'
        },
        {
          key: 'survival',
          name: 'Survival',
          attribute: 'Intelligence',
          description: 'Ability to survive in wilderness conditions'
        }
      ]
    },
    social: {
      title: 'Social Skills',
      skills: [
        {
          key: 'animalKen',
          name: 'Animal Ken',
          attribute: 'Charisma',
          description: 'Understanding and handling animals'
        },
        {
          key: 'deception',
          name: 'Deception',
          attribute: 'Manipulation',
          description: 'Ability to lie and mislead others'
        },
        {
          key: 'empathy',
          name: 'Empathy',
          attribute: 'Perception',
          description: 'Understanding others\' emotions and motivations'
        },
        {
          key: 'intimidation',
          name: 'Intimidation',
          attribute: 'Strength',
          description: 'Ability to frighten or coerce others'
        },
        {
          key: 'performance',
          name: 'Performance',
          attribute: 'Charisma',
          description: 'Artistic and dramatic abilities'
        },
        {
          key: 'persuasion',
          name: 'Persuasion',
          attribute: 'Charisma',
          description: 'Convincing others through reason and charm'
        },
        {
          key: 'seduction',
          name: 'Seduction',
          attribute: 'Appearance',
          description: 'Ability to attract and influence through charm'
        },
        {
          key: 'senseDeception',
          name: 'Sense Deception',
          attribute: 'Perception',
          description: 'Detecting lies and ulterior motives'
        }
      ]
    },
    mental: {
      title: 'Mental Skills',
      skills: [
        {
          key: 'alchemy',
          name: 'Alchemy',
          attribute: 'Intelligence',
          description: 'Creation and understanding of potions and compounds'
        },
        {
          key: 'arcana',
          name: 'Arcana',
          attribute: 'Intelligence',
          description: 'Knowledge of magic and mystical phenomena'
        },
        {
          key: 'awareness',
          name: 'Awareness',
          attribute: 'Perception',
          description: 'General alertness and attention to surroundings'
        },
        {
          key: 'detectTrap',
          name: 'Detect Trap',
          attribute: 'Perception',
          description: 'Finding and disarming traps and hazards'
        },
        {
          key: 'engineering',
          name: 'Engineering',
          attribute: 'Intelligence',
          description: 'Understanding and creating mechanical devices'
        },
        {
          key: 'investigation',
          name: 'Investigation',
          attribute: 'Intelligence',
          description: 'Gathering information and solving puzzles'
        },
        {
          key: 'lore',
          name: 'Lore',
          attribute: 'Intelligence',
          description: 'Knowledge of history, legends, and cultures'
        },
        {
          key: 'medicine',
          name: 'Medicine',
          attribute: 'Intelligence',
          description: 'Healing and treating injuries and illnesses'
        },
        {
          key: 'nature',
          name: 'Nature',
          attribute: 'Intelligence',
          description: 'Knowledge of plants, animals, and natural phenomena'
        },
        {
          key: 'perception',
          name: 'Perception',
          attribute: 'Perception',
          description: 'Noticing details and hidden objects'
        },
        {
          key: 'scrounge',
          name: 'Scrounge',
          attribute: 'Perception',
          description: 'Finding useful items and resources'
        },
        {
          key: 'tracking',
          name: 'Tracking',
          attribute: 'Perception',
          description: 'Following trails and finding creatures'
        }
      ]
    }
  };

  const handleSkillChange = (skillKey) => {
    const updatedSkills = {
      ...character.skills,
      [skillKey]: character.skills[skillKey] + 1
    };
    onCharacterUpdate({
      ...character,
      skills: updatedSkills,
      availableSkillPoints: character.availableSkillPoints - 1
    });
  };

  return (
    <VStack spacing={4} align="stretch">
      <Box 
        p={3} 
        bg={useColorModeValue('green.50', 'green.900')}
        borderRadius="md"
      >
        <Text fontWeight="bold">
          Available Skill Points: {character.availableSkillPoints}
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        {Object.entries(skillCategories).map(([key, category]) => (
          <SkillCategory
            key={key}
            title={category.title}
            skills={category.skills}
            character={character}
            onSkillChange={handleSkillChange}
            availablePoints={character.availableSkillPoints}
          />
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default SkillsTab;