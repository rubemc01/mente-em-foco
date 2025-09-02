import { useState, useRef, useEffect } from 'react';
import { Box, Heading, Wrap, Button, Icon, VStack, Text, ButtonGroup, Divider } from '@chakra-ui/react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { sounds } from './soundData';

export function SoundscapePlayer() {
  const [currentSound, setCurrentSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [timerDuration, setTimerDuration] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const timerIdRef = useRef(null);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSound]);

  useEffect(() => {
    if (isPlaying && timerDuration > 0) {
      timerIdRef.current = setTimeout(() => {
        setIsPlaying(false);
        setTimerDuration(0);
        setTimeRemaining(0);
        alert('O tempo do timer acabou!');
      }, timerDuration * 1000);
    }
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, [isPlaying, timerDuration]);

  useEffect(() => {
    let countdownInterval;
    if (isPlaying && timeRemaining > 0) {
      countdownInterval = setInterval(() => {
        setTimeRemaining((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(countdownInterval);
  }, [isPlaying, timeRemaining]);

  const handlePlay = (sound) => {
    if (currentSound?.src === sound.src) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSound(sound);
      setIsPlaying(true);
    }
  };

  const handleSetTimer = (durationInSeconds: number) => {
    setTimerDuration(durationInSeconds);
    setTimeRemaining(durationInSeconds);
  };
  
  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "Timer desativado";
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <VStack spacing={6} w="100%" maxW="600px">
      <Heading as="h2" size="lg">Sons de Ambiente</Heading>
      <Text>Selecione um som para ajudar na sua concentração.</Text>

      <Wrap spacing={4} justify="center">
        {sounds.map((sound) => {
          const isCurrentlyPlaying = currentSound?.src === sound.src && isPlaying;
          return (
            <Button
              key={sound.name}
              leftIcon={<Icon as={sound.icon} />}
              rightIcon={isCurrentlyPlaying ? <FaPause /> : <FaPlay />}
              colorScheme={isCurrentlyPlaying ? 'teal' : 'gray'}
              variant={isCurrentlyPlaying ? 'solid' : 'outline'}
              onClick={() => handlePlay(sound)}
              minW="150px"
            >
              {sound.name}
            </Button>
          );
        })}
      </Wrap>
      
      <audio ref={audioRef} src={currentSound?.src} loop style={{ display: 'none' }} />

      <Divider pt={4} />

      <VStack spacing={4} pt={4} w="100%">
        <Heading as="h3" size="md">Sleep Timer</Heading>
        <Text>O som irá parar automaticamente após o tempo selecionado.</Text>
        <ButtonGroup variant="outline" spacing="6">
          <Button onClick={() => handleSetTimer(15 * 60)} colorScheme={timerDuration === 15 * 60 ? 'teal' : 'gray'}>15 min</Button>
          <Button onClick={() => handleSetTimer(60 * 60)} colorScheme={timerDuration === 60 * 60 ? 'teal' : 'gray'}>1 hora</Button>
          <Button onClick={() => handleSetTimer(8 * 60 * 60)} colorScheme={timerDuration === 8 * 60 * 60 ? 'teal' : 'gray'}>8 horas</Button>
          <Button onClick={() => handleSetTimer(0)}>Desativar</Button>
        </ButtonGroup>
        <Box bg="white" p={4} borderRadius="md" boxShadow="sm" mt={4}>
          <Text fontSize="lg" fontWeight="bold" color="gray.600">
            Tempo restante: {formatTime(timeRemaining)}
          </Text>
        </Box>
      </VStack>
    </VStack>
  );
}