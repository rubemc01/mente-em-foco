// src/pages/AchievementsPage.tsx
import { useState } from 'react';
import { VStack, Heading, Text, Input, Button, HStack, Box } from '@chakra-ui/react';
import { useAppContext } from '../context/AppContext';

export function AchievementsPage() {
  const { achievements, addAchievement } = useAppContext();
  const [newAchievementText, setNewAchievementText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAchievementText.trim()) return;
    addAchievement(newAchievementText);
    setNewAchievementText('');
  };

  // Agrupa as conquistas por data para uma melhor visualização
  const groupedAchievements = achievements.reduce((acc, achievement) => {
    const date = achievement.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(achievement);
    return acc;
  }, {});

  return (
    <VStack spacing={8} align="start" w="100%" maxW="600px">
      <VStack align="start">
        <Heading>Diário de Conquistas</Heading>
        <Text color="gray.500">
          Anote as suas vitórias do dia, não importa o quão pequenas pareçam.
        </Text>
      </VStack>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <HStack w="100%">
          <Input 
            value={newAchievementText}
            onChange={(e) => setNewAchievementText(e.target.value)}
            placeholder="Qual foi a sua conquista de hoje?"
            variant="filled"
          />
          <Button type="submit" colorScheme="teal" px={8}>Adicionar</Button>
        </HStack>
      </form>

      <VStack spacing={6} align="stretch" w="100%">
        {Object.keys(groupedAchievements).length > 0 ? (
          Object.entries(groupedAchievements).map(([date, achievementsOnDate]) => (
            <Box key={date}>
              <Heading size="md" mb={2}>
                {new Date(date + 'T00:00:00').toLocaleDateString('pt-PT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </Heading>
              <VStack align="stretch" spacing={2}>
                {achievementsOnDate.map(ach => (
                  <Text key={ach.id} bg="white" p={3} borderRadius="md" boxShadow="sm">
                    - {ach.text}
                  </Text>
                ))}
              </VStack>
            </Box>
          ))
        ) : (
          <Text>Ainda não há conquistas. Adicione a sua primeira!</Text>
        )}
      </VStack>
    </VStack>
  );
}