import { useState, useEffect } from "react";
import { Box, Button, ButtonGroup, Heading, HStack, VStack, Text } from "@chakra-ui/react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";

const TEMPO_PAUSA_CURTA = 5 * 60;
const TEMPO_PAUSA_LONGA = 15 * 60;

export function PomodoroTimer() {
  const { activeTask, setActiveTask, settings, addXp } = useAppContext();
  const TEMPO_FOCO = settings.focusDuration * 60;
  
  const [mode, setMode] = useState<'foco' | 'pausaCurta' | 'pausaLonga'>('foco');
  const [tempoRestante, setTempoRestante] = useState(TEMPO_FOCO);
  const [estaAtivo, setEstaAtivo] = useState(false);

  useEffect(() => {
    if (mode === 'foco') {
      setTempoRestante(TEMPO_FOCO);
      setEstaAtivo(!!activeTask);
    }
  }, [settings.focusDuration, mode, TEMPO_FOCO, activeTask]);
  
  useEffect(() => {
    switch (mode) {
      case 'pausaCurta': setTempoRestante(TEMPO_PAUSA_CURTA); break;
      case 'pausaLonga': setTempoRestante(TEMPO_PAUSA_LONGA); break;
      default: setTempoRestante(TEMPO_FOCO); break;
    }
    setEstaAtivo(false);
  }, [mode, TEMPO_FOCO]);

  useEffect(() => {
    if (activeTask) {
      setMode('foco');
      setTempoRestante(TEMPO_FOCO);
      setEstaAtivo(true);
    } else {
      setEstaAtivo(false);
    }
  }, [activeTask, TEMPO_FOCO]);
  
  useEffect(() => {
    let intervalo: number;
    if (estaAtivo && tempoRestante > 0) {
      intervalo = setInterval(() => {
        setTempoRestante((tempo) => tempo - 1);
      }, 1000);
    } else if (estaAtivo && tempoRestante === 0) {
      new Audio('/sounds/alarm.mp3').play();
      if (mode === 'foco' && activeTask) {
        addXp(250); // Ganha XP por completar um Pomodoro
        setMode('pausaCurta');
      } else { 
        setMode('foco'); 
        setActiveTask(null); 
      }
      setEstaAtivo(true);
    }
    return () => clearInterval(intervalo);
  }, [estaAtivo, tempoRestante, mode, activeTask, setActiveTask, addXp]);

  const handleStartPause = () => {
    if (mode === 'foco' && !activeTask) {
      alert("Por favor, selecione uma tarefa para focar primeiro!");
      return;
    }
    setEstaAtivo(!estaAtivo);
  };

  const handleReset = () => {
    setEstaAtivo(false);
    setMode('foco');
    setActiveTask(null);
  };
  
  const handleModeChange = (newMode: 'foco' | 'pausaCurta' | 'pausaLonga') => {
    if (newMode === 'foco' && !activeTask) {
       alert('Selecione uma tarefa na lista antes de iniciar o foco.');
       return;
    }
    setMode(newMode);
  };

  const minutos = Math.floor(tempoRestante / 60).toString().padStart(2, "0");
  const segundos = (tempoRestante % 60).toString().padStart(2, "0");

  return (
    <VStack spacing={6} w="100%" maxW="600px">
      <ButtonGroup variant="outline" spacing="6">
        <Button colorScheme={mode === 'foco' ? 'teal' : 'gray'} onClick={() => handleModeChange('foco')}>Foco</Button>
        <Button colorScheme={mode === 'pausaCurta' ? 'teal' : 'gray'} onClick={() => handleModeChange('pausaCurta')}>Pausa Curta</Button>
        <Button colorScheme={mode === 'pausaLonga' ? 'teal' : 'gray'} onClick={() => handleModeChange('pausaLonga')}>Pausa Longa</Button>
      </ButtonGroup>

      <Box textAlign="center" p={4} bg="white" borderRadius="lg" boxShadow="sm" w="100%">
        <Heading as="h2" size="md" color="gray.600">
          FOCO ATUAL:
        </Heading>
        <Text fontSize="xl" fontWeight="bold" color="teal.600" minH="30px">
          {mode === 'foco' && activeTask ? activeTask.text : 'Selecione uma tarefa abaixo'}
        </Text>
      </Box>

      <Heading fontFamily="monospace" fontSize="9xl" color={estaAtivo ? "teal.500" : "gray.600"}>
        {minutos}:{segundos}
      </Heading>

      <HStack spacing={4}>
        <Button onClick={handleStartPause} colorScheme={estaAtivo ? "yellow" : "teal"} size="lg" leftIcon={estaAtivo ? <FaPause /> : <FaPlay />} width="150px">
          {estaAtivo ? "Pausar" : "Iniciar"}
        </Button>
        <Button onClick={handleReset} variant="outline" size="lg" leftIcon={<FaRedo />}>
          Resetar
        </Button>
      </HStack>
    </VStack>
  );
}