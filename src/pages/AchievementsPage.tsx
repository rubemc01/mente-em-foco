import { useState } from 'react';
import { VStack, Heading, Text, Input, Button, HStack, Box } from '@chakra-ui/react';
import { useAppContext } from '../context/AppContext';

// Interfaces definidas localmente
interface Achievement {
  id: number;
  text: string;
  date: string;
}

export function AchievementsPage() {
  const { achievements, addAchievement } = useAppContext();
  const [newAchievementText, setNewAchievementText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAchievementText.trim()) return;
    addAchievement(newAchievementText);
    setNewAchievementText('');
  };

  const groupedAchievements = achievements.reduce((acc, achievement) => {
    const date = achievement.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);

  return (
    <VStack spacing={8} align="stretch" w="100%">
      <VStack align="start">
        <Heading>Diário de Conquistas</Heading>
        {/* TEXTO DE INSTRUÇÃO ADICIONADO */}
        <Text color="gray.500">
          Anote as suas vitórias do dia, não importa o quão pequenas pareçam. Celebrar o progresso é um grande motivador!
        </Text>
      </VStack>

      <Box as="form" onSubmit={handleSubmit} p={6} bg="white" borderRadius="md" boxShadow="sm" w="100%">
        <HStack w="100%">
          <Input 
            value={newAchievementText}
            onChange={(e) => setNewAchievementText(e.target.value)}
            placeholder="Qual foi a sua conquista de hoje?"
            variant="filled"
          />
          <Button type="submit" colorScheme="bluePrimary" px={8}>Adicionar</Button>
        </HStack>
      </form>

      <VStack spacing={6} align="stretch" w="100%">
        {Object.keys(groupedAchievements).length > 0 ? (
          Object.entries(groupedAchievements).map(([date, achievementsOnDate]) => (
            <Box key={date}>
              <Heading size="md" mb={2}>
                {new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </Heading>
              <VStack align="stretch" spacing={2}>
                {(achievementsOnDate as Achievement[]).map(ach => (
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