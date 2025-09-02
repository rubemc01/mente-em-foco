import { useState, useMemo } from 'react';
import {
  VStack, Heading, Text, HStack, IconButton, Textarea, Button, useToast, Box
} from '@chakra-ui/react';
import { useAppContext } from '../context/AppContext';

const moods = [
  { name: 'excelente', emoji: '😄' },
  { name: 'bem', emoji: '🙂' },
  { name: 'ok', emoji: '😐' },
  { name: 'mal', emoji: '😕' },
  { name: 'péssimo', emoji: '😠' },
];

export function MoodTrackerPage() {
  const { moodHistory, addMoodEntry } = useAppContext();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const toast = useToast();

  const todayEntry = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return moodHistory.find(entry => entry.date === today);
  }, [moodHistory]);

  const handleSubmit = () => {
    if (!selectedMood) {
      toast({ title: 'Por favor, selecione um humor.', status: 'warning', duration: 3000, isClosable: true });
      return;
    }
    addMoodEntry(selectedMood, note);
    toast({ title: 'Humor registado com sucesso!', status: 'success', duration: 3000, isClosable: true });
  };
  
  return (
    <VStack spacing={8} align="stretch" w="100%">
      <VStack align="start">
        <Heading>Registo de Humor Diário</Heading>
        <Text color="gray.500">
          Como se está a sentir hoje? Registar o seu humor ajuda a identificar padrões.
        </Text>
      </VStack>

      {todayEntry && (
        <Box p={6} bg="white" borderRadius="md" boxShadow="sm" textAlign="center">
          <Heading size="md">O seu humor de hoje já foi registado!</Heading>
          <Text fontSize="6xl">{moods.find(m => m.name === todayEntry.mood)?.emoji}</Text>
          {todayEntry.note && <Text mt={2} fontStyle="italic">"{todayEntry.note}"</Text>}
          <Text mt={4}>Pode atualizá-lo abaixo se quiser.</Text>
        </Box>
      )}

      <VStack p={6} bg="white" borderRadius="md" boxShadow="sm" spacing={6}>
        <Heading size="md">Selecione o seu humor</Heading>
        <HStack spacing={{ base: 2, md: 4 }}>
          {moods.map(mood => (
            <VStack key={mood.name}>
              <IconButton
                aria-label={mood.name}
                icon={<Text fontSize="4xl">{mood.emoji}</Text>}
                isRound
                size="lg"
                variant={selectedMood === mood.name ? 'solid' : 'outline'}
                colorScheme="teal"
                onClick={() => setSelectedMood(mood.name)}
              />
              <Text fontSize="sm">{mood.name}</Text>
            </VStack>
          ))}
        </HStack>
        <Textarea 
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Quer adicionar uma nota sobre o porquê? (opcional)"
        />
        <Button colorScheme="teal" onClick={handleSubmit}>
          {todayEntry ? 'Atualizar Humor' : 'Registar Humor'}
        </Button>
      </VStack>
    </VStack>
  );
}